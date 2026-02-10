import React, { useState, useEffect } from 'react';

const { ipcRenderer } = window.require('electron');

interface Step {
  id: string;
  title: string;
  description: string;
  screenshot: string;
}

interface Project {
  name: string;
  description: string;
  steps: Step[];
}

const App: React.FC = () => {
  const [project, setProject] = useState<Project>({
    name: 'New Project',
    description: '',
    steps: [],
  });
  const [selectedStepIndex, setSelectedStepIndex] = useState<number | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  useEffect(() => {
    // Listen for menu events
    ipcRenderer.on('new-project', handleNewProject);
    ipcRenderer.on('take-screenshot', handleCaptureScreenshot);
    ipcRenderer.on('save-project', handleSaveProject);
    ipcRenderer.on('open-project', (event: any, filePath: string) => {
      handleLoadProject(filePath);
    });

    return () => {
      ipcRenderer.removeAllListeners('new-project');
      ipcRenderer.removeAllListeners('take-screenshot');
      ipcRenderer.removeAllListeners('save-project');
      ipcRenderer.removeAllListeners('open-project');
    };
  }, [project]);

  const handleNewProject = () => {
    if (project.steps.length > 0) {
      if (confirm('Start a new project? Unsaved changes will be lost.')) {
        setProject({
          name: 'New Project',
          description: '',
          steps: [],
        });
        setSelectedStepIndex(null);
      }
    } else {
      setProject({
        name: 'New Project',
        description: '',
        steps: [],
      });
      setSelectedStepIndex(null);
    }
  };

  const handleCaptureScreenshot = async () => {
    setIsCapturing(true);
    try {
      const result = await ipcRenderer.invoke('capture-screenshot');
      if (result.success) {
        const newStep: Step = {
          id: Date.now().toString(),
          title: `Step ${project.steps.length + 1}`,
          description: '',
          screenshot: `data:image/png;base64,${result.data}`,
        };
        setProject((prev) => ({
          ...prev,
          steps: [...prev.steps, newStep],
        }));
        setSelectedStepIndex(project.steps.length);
      } else {
        alert('Failed to capture screenshot: ' + result.error);
      }
    } catch (error: any) {
      alert('Error capturing screenshot: ' + error.message);
    } finally {
      setIsCapturing(false);
    }
  };

  const handleSaveProject = async () => {
    try {
      const result = await ipcRenderer.invoke('save-project', project);
      if (result.success) {
        alert('Project saved successfully!');
      } else if (result.error !== 'Save cancelled') {
        alert('Failed to save project: ' + result.error);
      }
    } catch (error: any) {
      alert('Error saving project: ' + error.message);
    }
  };

  const handleLoadProject = async (filePath: string) => {
    try {
      const result = await ipcRenderer.invoke('load-project', filePath);
      if (result.success) {
        setProject(result.project);
        setSelectedStepIndex(null);
      } else {
        alert('Failed to load project: ' + result.error);
      }
    } catch (error: any) {
      alert('Error loading project: ' + error.message);
    }
  };

  const handleExportHTML = async () => {
    try {
      const result = await ipcRenderer.invoke('export-html', project);
      if (result.success) {
        alert('Documentation exported successfully!');
      } else if (result.error !== 'Export cancelled') {
        alert('Failed to export: ' + result.error);
      }
    } catch (error: any) {
      alert('Error exporting: ' + error.message);
    }
  };

  const updateProjectField = (field: keyof Project, value: string) => {
    setProject((prev) => ({ ...prev, [field]: value }));
  };

  const updateStepField = (index: number, field: keyof Step, value: string) => {
    setProject((prev) => ({
      ...prev,
      steps: prev.steps.map((step, i) =>
        i === index ? { ...step, [field]: value } : step
      ),
    }));
  };

  const deleteStep = (index: number) => {
    if (confirm('Delete this step?')) {
      setProject((prev) => ({
        ...prev,
        steps: prev.steps.filter((_, i) => i !== index),
      }));
      if (selectedStepIndex === index) {
        setSelectedStepIndex(null);
      } else if (selectedStepIndex !== null && selectedStepIndex > index) {
        setSelectedStepIndex(selectedStepIndex - 1);
      }
    }
  };

  const moveStep = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= project.steps.length) return;

    const newSteps = [...project.steps];
    [newSteps[index], newSteps[newIndex]] = [newSteps[newIndex], newSteps[index]];
    setProject((prev) => ({ ...prev, steps: newSteps }));

    if (selectedStepIndex === index) {
      setSelectedStepIndex(newIndex);
    } else if (selectedStepIndex === newIndex) {
      setSelectedStepIndex(index);
    }
  };

  return (
    <div className="app">
      <div className="sidebar">
        <div className="project-info">
          <h2>Project Details</h2>
          <div className="form-group">
            <label>Project Name:</label>
            <input
              type="text"
              value={project.name}
              onChange={(e) => updateProjectField('name', e.target.value)}
              placeholder="Enter project name"
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              value={project.description}
              onChange={(e) => updateProjectField('description', e.target.value)}
              placeholder="Enter project description"
              rows={3}
            />
          </div>
        </div>

        <div className="actions">
          <button
            className="btn btn-primary"
            onClick={handleCaptureScreenshot}
            disabled={isCapturing}
          >
            📸 {isCapturing ? 'Capturing...' : 'Capture Screenshot'}
          </button>
          <button className="btn btn-secondary" onClick={handleSaveProject}>
            💾 Save Project
          </button>
          <button className="btn btn-secondary" onClick={handleExportHTML}>
            📄 Export to HTML
          </button>
        </div>

        <div className="steps-list">
          <h3>Steps ({project.steps.length})</h3>
          {project.steps.length === 0 ? (
            <p className="empty-message">
              No steps yet. Click "Capture Screenshot" to add your first step.
            </p>
          ) : (
            <div className="steps">
              {project.steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`step-item ${selectedStepIndex === index ? 'selected' : ''}`}
                  onClick={() => setSelectedStepIndex(index)}
                >
                  <div className="step-number">{index + 1}</div>
                  <div className="step-info">
                    <div className="step-title">{step.title}</div>
                    {step.screenshot && <div className="step-has-image">📷</div>}
                  </div>
                  <div className="step-actions">
                    <button
                      className="btn-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        moveStep(index, 'up');
                      }}
                      disabled={index === 0}
                      title="Move up"
                    >
                      ▲
                    </button>
                    <button
                      className="btn-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        moveStep(index, 'down');
                      }}
                      disabled={index === project.steps.length - 1}
                      title="Move down"
                    >
                      ▼
                    </button>
                    <button
                      className="btn-icon btn-delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteStep(index);
                      }}
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="main-content">
        {selectedStepIndex !== null ? (
          <div className="step-editor">
            <h2>Edit Step {selectedStepIndex + 1}</h2>
            <div className="form-group">
              <label>Step Title:</label>
              <input
                type="text"
                value={project.steps[selectedStepIndex].title}
                onChange={(e) =>
                  updateStepField(selectedStepIndex, 'title', e.target.value)
                }
                placeholder="Enter step title"
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea
                value={project.steps[selectedStepIndex].description}
                onChange={(e) =>
                  updateStepField(selectedStepIndex, 'description', e.target.value)
                }
                placeholder="Enter step description"
                rows={5}
              />
            </div>
            {project.steps[selectedStepIndex].screenshot && (
              <div className="screenshot-preview">
                <label>Screenshot:</label>
                <img
                  src={project.steps[selectedStepIndex].screenshot}
                  alt={`Step ${selectedStepIndex + 1}`}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="welcome">
            <h1>Welcome to DocuCapture</h1>
            <p>Create professional step-by-step documentation with ease.</p>
            <div className="getting-started">
              <h3>Getting Started:</h3>
              <ol>
                <li>Give your project a name and description in the sidebar</li>
                <li>Click "Capture Screenshot" to capture your screen</li>
                <li>Add a title and description for each step</li>
                <li>Organize steps by dragging them up or down</li>
                <li>Save your project or export to HTML</li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
