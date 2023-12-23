import React, { useState } from 'react'
import styles from '../styles/AddBlog.module.css'
import goBack from '../assets/Arrow.png'
import folderAdd from '../assets/folder-add.png'
import gallery from '../assets/gallery.png'
import X from '../assets/X.png'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getCategories } from '../api/serverApi'
import Categories from '../components/Categories'


const AddBlogPage = () => {
  const [authorValue, setAuthorValue] = useState('');
  const [titleValue, setTitleValue] = useState('');
  const [descValue, setDescValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [categoriesValue, setSetCategoriesValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const fileInputRef = React.createRef();
  const { isLoading, error, data } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const goBackF = () => {
    navigate('/');
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(authorValue)
    console.log('Form data:', new FormData(event.target));
    console.log('Selected File:', file ? file.name : null);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    setFile(droppedFiles[0]);
  };

  const handleFileInputChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };


  const isGeorgianAlphabet = (value) => {
    const georgianAlphabetRegex = /^[\u10A0-\u10FF\s]+$/;
    return georgianAlphabetRegex.test(value);
  };
  

  const ValidateAuthorValue = (e) => {
    const value = e.target.value;
    setAuthorValue(value);
    let newErrors = {};
    
    if (value.split(' ').length < 2) {
      newErrors.twoWord = "მინიმუმ ორი სიტყვა";
    } 
    if (value.length < 4) {
      newErrors.fourSymbol = "მინიმუმ 4 სიმბოლო";
    } 
    if (!isGeorgianAlphabet(value)) {
      newErrors.georgian = "მხოლოდ ქართული სიმბოლოები";
    } 
    setErrors(newErrors);
  }
 


  return (
    <div className={styles.AddBlog}>
      <div className={styles.backButton}>
        <img src={goBack} alt="Back" onClick={goBackF} />
      </div>
      <div className={styles.content}>
        <div className={styles.addBlogContent} onDrop={handleDrop} onDragOver={(event) => event.preventDefault()}>
          <form onSubmit={onSubmit}>
            <h1>ბლოგის დამატება</h1>
            <div className={styles.photoUpload}>
              <p>ატვირთეთ ფოტო </p>
              {!file ? (
                <div
                  onDrop={handleDrop}
                  onDragOver={(event) => event.preventDefault()}
                  className={styles.addPhoto}
                >
                  <div className={styles.folder}>
                    <img src={folderAdd} alt="" />
                  </div>
                  <div className={styles.photoP}>
                  <p>ჩააგდეთ ფაილი აქ ან </p>
                  <p onClick={handleUploadClick} style={{textDecoration: "underline", cursor:'pointer'}}>აირჩიეთ ფაილი</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileInputChange}
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                  />
                </div>
              ) : (
                <div className={styles.uploadedImg}>
                  <div className={styles.folderName}>
                    <img src={gallery} alt="done" />
                    {file.name}{' '}
                  </div>
                  <div className={styles.uploadedImgRemove}>
                    <img src={X} alt="X" onClick={handleRemoveFile} style={{cursor: 'pointer'}}/>
                  </div>
                </div>
              )}
            </div>
            <div className={styles.inputHub}>
              <div className={styles.author}>
                <p>ავტორი *</p>
                <input
                  type="text"
                  value={authorValue}
                  onChange={ValidateAuthorValue}
                />
                 <p className={styles.authorErr} style={{ color: errors.twoWord ? 'gray' :  'green'  }}>
                  <span className={styles.bulletPoint}>&bull;</span>
                  {errors.twoWord || 'მინიმუმ ორი სიტყვა'}
                </p>
                <p className={styles.authorErr} style={{ color: errors.fourSymbol ? 'gray' : 'green'  }}>
                  <span className={styles.bulletPoint}>&bull;</span>
                  {errors.fourSymbol || 'მინიმუმ 4 სიმბოლო'}
                </p>
                <p className={styles.authorErr} style={{ color: errors.georgian ? 'gray' : 'green' }}>
                  <span className={styles.bulletPoint}>&bull;</span>
                  {errors.georgian || 'მხოლოდ ქართული სიმბოლოები'}
                </p>
              </div>
              <div className={styles.title}>
                <p>სათაური *</p>
                <input type="text" />
              </div>
            </div>
              <div className={styles.Description}>
                <p>Description *</p>
                <input type="text" />
              </div>
              <div className={styles.inputHub}>
                  <div className={styles.uploadDate}>
                    <p>გამოქვეყნების თარიღი *</p>
                    <input type="date" />
                  </div>
                  <div className={styles.categories}>
                    <p>კატეგორია *</p>
                    <select name="categories" id="categories">
                      {data && data.data.map((category) => (
                        <Categories
                        key={category.id}
                        title={category.title}
                        text_color={category.text_color}
                        background_color={category.background_color}
                        />
                        ))}
                    </select>
                  </div>
              </div>
              <div className={ styles.emailContainer}>
              <div className={styles.email}>
                  <p>ელ–ფოსტა *</p>
                  <input type="email" />
              </div>
                  <div className={styles.emptyspace}></div>

              </div>
              <div className={styles.submit}>
                <div className={styles.emptyspace}></div>
                <button type="submit">გამოქვეყნება</button>
              </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBlogPage