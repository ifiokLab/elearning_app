/*const [sections, setSections] = useState([]);
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [newSectionDescription, setNewSectionDescription] = useState('');
  const [newSectionContent, setNewSectionContent] = useState('');
  const [newSectionContentType, setNewSectionContentType] = useState('');
  const [newContentTitle, setNewContentTitle] = useState('');
  const [newAssignmentDescription, setNewAssignmentDescription] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [addingContentIndex, setAddingContentIndex] = useState(null);
  const [editingContentIndex, setEditingContentIndex] = useState(null);
  const { courseId } = useParams();

  

  const addSection = () => {
    if (newSectionTitle.trim() !== '') {
      const updatedSections = [...sections];

      if (editingIndex !== null) {
        // If editing, update the existing section
        updatedSections[editingIndex] = {
          title: newSectionTitle,
          description: newSectionDescription,
          content: newSectionContent,
          contentType: newSectionContentType,
          isVisible: false,
        };
        setEditingIndex(null);
      } else {
        // If not editing, add a new section
        updatedSections.push({
          title: newSectionTitle,
          description: newSectionDescription,
          content: newSectionContent,
          contentType: newSectionContentType,
          isVisible: false,
        });
      }

      // Clear input fields
      setSections(updatedSections);
      setNewSectionTitle('');
      setNewSectionDescription('');
      setNewSectionContent('');
      setNewSectionContentType('');
    }
  };

  const toggleSectionVisibility = (index) => {
    const updatedSections = [...sections];
    updatedSections[index].isVisible = !updatedSections[index].isVisible;
    setSections(updatedSections);

    // If the section is visible, reset editingIndex
    if (updatedSections[index].isVisible) {
      setEditingIndex(null);
      setAddingContentIndex(null);
    }
  };

  const startEditing = (index) => {
    const section = sections[index];
    setNewSectionTitle(section.title);
    setNewSectionDescription(section.description);
    setNewSectionContent(section.content);
    setNewSectionContentType(section.contentType);
    setEditingIndex(index);
  };

  const startAddingContent = (index) => {
    setAddingContentIndex(index);
    // Clear previous content input values when starting to add new content
    setNewSectionContent('');
    setNewSectionContentType('');
    setNewContentTitle('');
    setNewAssignmentDescription('');
  };

  const addContentToSection = () => {
    const updatedSections = [...sections];
    const section = updatedSections[addingContentIndex];

    // Initialize the content array if it doesn't exist
    if (!section.content) {
      section.content = [];
    }

    // Add new content to the selected section
    if (newSectionContentType && newContentTitle) {
      const content = {
        title: newContentTitle,
        contentType: newSectionContentType,
      };

      if (newSectionContentType === 'assignment') {
        content.description = newAssignmentDescription;
      } else {
        content.content = newSectionContent;
      }

      section.content.push(content);
    }

    setSections(updatedSections);
    setNewSectionContent('');
    setNewSectionContentType('');
    setNewContentTitle('');
    setNewAssignmentDescription('');
    setAddingContentIndex(null);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // You can handle file upload logic here
      // For simplicity, let's set the content as the file URL
      setNewSectionContent(URL.createObjectURL(file));
    }
  };

  const deleteSection = (index) => {
    const updatedSections = [...sections];
    updatedSections.splice(index, 1);
    setSections(updatedSections);
  };
 

const startEditingContent = (sectionIndex, contentIndex) => {
  setEditingContentIndex(contentIndex);
  const content = sections[sectionIndex].content[contentIndex];
  setNewContentTitle(content.title);
  setNewSectionContentType(content.contentType);
  setNewSectionContent(content.contentType === 'assignment' ? content.description : content.content);
  setNewAssignmentDescription(content.contentType === 'assignment' ? content.description : '');
};

const deleteContent = (sectionIndex, contentIndex) => {
  const updatedSections = [...sections];
  updatedSections[sectionIndex].content.splice(contentIndex, 1);
  setSections(updatedSections);
};

const updateContentInSection = () => {
  const updatedSections = [...sections];
  const content = {
    title: newContentTitle,
    contentType: newSectionContentType,
  };

  if (newSectionContentType === 'assignment') {
    content.description = newAssignmentDescription;
  } else {
    content.content = newSectionContent;
  }

  updatedSections[addingContentIndex].content[editingContentIndex] = content;

  setSections(updatedSections);
  setNewContentTitle('');
  setNewSectionContentType('');
  setNewSectionContent('');
  setNewAssignmentDescription('');
  setEditingContentIndex(null);
};

  const getContentElement = (content) => {
    switch (content.contentType) {
      case 'video':
        return (
          <div key={content.title}>
            <h4>{content.title}</h4>
            <video src={content.content} controls />
          </div>
        );

      case 'audio':
        return (
          <div key={content.title}>
            <h4>{content.title}</h4>
            <audio src={content.content} controls />
          </div>
        );

      case 'document':
        return (
          <div key={content.title}>
            <h4>{content.title}</h4>
            <a href={content.content} target="_blank" rel="noopener noreferrer">
              Open Document
            </a>
          </div>
        );

      case 'image':
        return (
          <div key={content.title}>
            <h4>{content.title}</h4>
            <img src={content.content} alt="Content Image" />
          </div>
        );

      case 'assignment':
        return (
          <div key={content.title}>
            <h4>{content.title}</h4>
           
            <ReactQuill readOnly theme="snow" value={content.description} />
          </div>
        );

      case 'codingExercise':
        return (
          <div key={content.title}>
            <h4>{content.title}</h4>
            <p>Coding Exercise: {content.content}</p>
          </div>
        );

      // Add cases for other content types as needed

      default:
        return null;
    }
  };

  

 
  
  
  return (
    <div className='page-wrapper' >
      <Header />
      <div className='wrapper'>
        <div>
        {sections.map((section, index) => (
          <div key={index} >
            <div className = 'section-wrapper'>
              <h3>
                {section.title}
                <button className = 'delete-section-btn' onClick={() => deleteSection(index)}><i class="fa-solid fa-trash"></i></button>
              </h3>
              <p>{section.description}</p>
              {section.isVisible && (
                <div >
                  {section.content &&
                    section.content.map((content, contentIndex) => (
                      <div key={contentIndex} className='content-wrapper'>
                        {getContentElement(content)}
                        <button className='add-section-btn'  onClick={() => startEditingContent(index, contentIndex)}>
                          <i class="fa-solid fa-pen-to-square"></i>
                          Edit Content
                        </button>
                        <button className='add-section-btn' onClick={() => deleteContent(index, contentIndex)}>
                          <i class="fa-solid fa-trash"></i>
                          Delete Content
                        </button>
                      </div>
                    ))}
                  {addingContentIndex === index && (
                    <div className='input-wrapper'>
                      <input
                        type="text"
                        placeholder="Enter content title"
                        value={newContentTitle}
                        onChange={(e) => setNewContentTitle(e.target.value)}
                      />
                      <select
                        value={newSectionContentType}
                        onChange={(e) => setNewSectionContentType(e.target.value)}
                      >
                        <option value="">Select Content Type</option>
                        <option value="video">Video</option>
                        <option value="audio">Audio</option>
                        <option value="document">Document</option>
                        <option value="image">Image</option>
                        <option value="assignment">Assignment</option>
                        <option value="codingExercise">Coding Exercise</option>
                       
                      </select>
                      {newSectionContentType === 'document' ? (
                        <input
                          type="file"
                          accept=".pdf, .doc, .docx"
                          onChange={handleFileUpload}
                        />
                      ) : newSectionContentType === 'assignment' ? (
                        <div>
                          <label>Assignment Description</label>
                        
                          <ReactQuill
                            theme="snow"
                            value={newAssignmentDescription}
                            onChange={(value) => setNewAssignmentDescription(value)}
                            modules={{
                              toolbar: [
                                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                                ['bold', 'italic', 'underline', 'strike'],
                                [{ list: 'ordered' }, { list: 'bullet' }],
                                ['link', 'image', 'video'],
                                ['clean'],
                              ],
                            }}
                            formats={[
                              'header',
                              'bold', 'italic', 'underline', 'strike',
                              'list', 'bullet',
                              'link', 'image', 'video',
                            ]}
                          />
                        </div>
                      ) : (
                        <input
                          type="file"
                          accept={newSectionContentType === 'image' ? 'image/*' : 'audio/*, video/*'}
                          onChange={handleFileUpload}
                        />
                      )}
                      {newSectionContentType && (
                        editingContentIndex !== null ? (
                          <button onClick={updateContentInSection}>Update Content</button>
                        ) : (
                          <button className='save-content' onClick={addContentToSection}>Save</button>
                        )
                      )}
                    </div>
                  )}
                </div>
              )}
              <button className='add-section-btn' onClick={() => toggleSectionVisibility(index)}>
                {section.isVisible ? 'Hide' : 'Show'} Section
              </button>
              <button className='add-section-btn' onClick={() => startEditing(index)}>
                <i class="fa-solid fa-pen-to-square"></i>
                Edit Section
              </button>
              {section.isVisible && (
                <button className='add-section-btn' onClick={() => startAddingContent(index)}>Add Content</button>
              )}
            </div>
          </div>
        ))}
    
        <div className = 'section-wrapper'>
          <div className='input-wrapper'>
            <input
              type="text"
              placeholder="Enter section title"
              value={newSectionTitle}
              onChange={(e) => setNewSectionTitle(e.target.value)}
            />
            <textarea
              placeholder="Enter section description"
              value={newSectionDescription}
              onChange={(e) => setNewSectionDescription(e.target.value)}
            />
          </div>
          <button className='add-section-btn' onClick={addSection}>
            <i class="fa-solid fa-plus"></i>
            Add Section
          </button>
        </div>
      </div>
      </div>
    </div>
  );
   */