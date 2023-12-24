import React, { useState } from "react";
import styles from "../styles/AddBlog.module.css";
import goBack from "../assets/Arrow.png";
import folderAdd from "../assets/folder-add.png";
import gallery from "../assets/gallery.png";
import X from "../assets/X.png";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../api/serverApi";
import Select from "react-select";
import info_circle from "../assets/info-circle.png";

const AddBlogPage = () => {
  const [authorValue, setAuthorValue] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [descValue, setDescValue] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [categoriesValue, setSetCategoriesValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const fileInputRef = React.createRef();
  const {  data } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const goBackF = () => {
    navigate("/");
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(
      authorValue,
      dateValue,
      titleValue,
      descValue,
      categoriesValue,
      emailValue
    );
    let newErrors = {};
    if(emailValue){

      if (!emailValue.endsWith("@redberry.ge")) {
        newErrors.EmailErr = "მეილი უნდა მთავრდებოდეს @redberry.ge–ით";
      }
      setErrors(newErrors);
    }
    if(file, authorValue,
      dateValue,
      titleValue,
      descValue,
      categoriesValue){
        console.log(authorValue)
        console.log(file)
        console.log(titleValue)
        console.log(descValue)
        console.log(categoriesValue)
        console.log(emailValue)

      }
      

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

  const validTitleValue = (e) => {
    const value = e.target.value;
    setTitleValue(value);
    let newErrors = {};
    if (value.length < 4) {
      newErrors.TitlefourSymbol = "მინიმუმ 4 სიმბოლო";
    }
    setErrors(newErrors);
  };
  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setDescValue(value);
    let newErrors = {};
    if (value.length < 4) {
      newErrors.DescfourSymbol = "მინიმუმ 4 სიმბოლო";
    }
    setErrors(newErrors);
  };

  const handleDataChange = (e) => {
    let value = e.target.value;
    setDateValue(value);
    console.log("date", value);
  };

  const ValidateAuthorValue = (e) => {
    const value = e.target.value;
    setAuthorValue(value);
    let newErrors = {};
    if (value.split(" ").length < 2) {
      newErrors.AuthortwoWord = "მინიმუმ ორი სიტყვა";
    }
    if (value.length < 4) {
      newErrors.AuthorfourSymbol = "მინიმუმ 4 სიმბოლო";
    }
    if (!isGeorgianAlphabet(value)) {
      newErrors.Authorgeorgian = "მხოლოდ ქართული სიმბოლოები";
    }
    setErrors(newErrors);
  };

  const selectAnswer = (e) => {
    const value = e.value;
    const selectedStrings = e.map((option) => option.value);
    setSetCategoriesValue(selectedStrings);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmailValue(value);
    const newError = {}
    setErrors(newError)
  };

  return (
    <div className={styles.AddBlog}>
      <div className={styles.backButton}>
        <img src={goBack} alt="Back" onClick={goBackF} />
      </div>
      <div className={styles.content}>
        <div
          className={styles.addBlogContent}
          onDrop={handleDrop}
          onDragOver={(event) => event.preventDefault()}
        >
          <form onSubmit={onSubmit}>
            <h1>ბლოგის დამატება</h1>
            <div className={styles.photoUpload}>
              <p>ატვირთეთ ფოტო *</p>
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
                    <p
                      onClick={handleUploadClick}
                      style={{ textDecoration: "underline", cursor: "pointer" }}
                    >
                      აირჩიეთ ფაილი
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileInputChange}
                    style={{ display: "none" }}
                    ref={fileInputRef}
                  />
                </div>
              ) : (
                <div className={styles.uploadedImg}>
                  <div className={styles.folderName}>
                    <img src={gallery} alt="done" />
                    {file.name}{" "}
                  </div>
                  <div className={styles.uploadedImgRemove}>
                    <img
                      src={X}
                      alt="X"
                      onClick={handleRemoveFile}
                      style={{ cursor: "pointer" }}
                    />
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
                  placeholder="შეიყვანეთ ავტორი"
                  style={{
                    border:
                      !errors.AuthortwoWord &&
                      authorValue.length >= 4 &&
                      isGeorgianAlphabet(authorValue)
                        ? "#14D81C solid 1px"
                        : "#E4E3EB solid 1px",
                  }}
                />
                <p
                  className={styles.authorErr}
                  style={{
                    color: errors.AuthortwoWord
                      ? "#85858D"
                      : authorValue.split(" ").length >= 2
                      ? "#14D81C"
                      : "#85858D",
                  }}
                >
                  <span className={styles.bulletPoint}>&bull;</span>
                  მინიმუმ ორი სიტყვა
                </p>
                <p
                  className={styles.authorErr}
                  style={{
                    color: errors.AuthorfourSymbol
                      ? "#85858D"
                      : authorValue.length >= 4
                      ? "#14D81C"
                      : "#85858D",
                  }}
                >
                  <span className={styles.bulletPoint}>&bull;</span>
                  მინიმუმ 4 სიმბოლო
                </p>
                <p
                  className={styles.authorErr}
                  style={{
                    color: errors.Authorgeorgian
                      ? "#85858D"
                      : isGeorgianAlphabet(authorValue)
                      ? "#14D81C"
                      : "#85858D",
                  }}
                >
                  <span className={styles.bulletPoint}>&bull;</span>
                  მხოლოდ ქართული სიმბოლოები
                </p>
              </div>
              <div className={styles.title}>
                <p>სათაური *</p>
                <input
                  type="text"
                  value={titleValue}
                  placeholder="შეიყვანეთ სათაური"
                  onChange={validTitleValue}
                  style={{
                    border:
                      titleValue.length >= 4
                        ? "#14D81C solid 1px"
                        : "#E4E3EB solid 1px",
                  }}
                />
                <p
                  className={styles.authorErr}
                  style={{
                    color: errors.TitlefourSymbol
                      ? "#85858D"
                      : titleValue.length >= 4
                      ? "#14D81C"
                      : "#85858D",
                  }}
                >
                  <span className={styles.bulletPoint}></span>
                  მინიმუმ 4 სიმბოლო
                </p>
              </div>
            </div>
            <div className={styles.Description}>
              <p>Description *</p>
              <textarea
                rows="4"
                value={descValue}
                placeholder="შეიყვანეთ აღწერა"
                onChange={handleDescriptionChange}
                style={{
                  resize: "none",
                  border:
                    !errors.DescfourSymbol && descValue.length >= 4
                      ? "#14D81C solid 1px"
                      : "#E4E3EB solid 1px",
                }}
              />
              <p
                className={styles.authorErr}
                style={{
                  color: errors.DescfourSymbol
                    ? "#85858D"
                    : descValue.length >= 4
                    ? "#14D81C"
                    : "#85858D",
                  marginTop: "10px",
                }}
              >
                <span className={styles.bulletPoint}></span>
                მინიმუმ 4 სიმბოლო
              </p>
            </div>
            <div className={styles.inputHub}>
              <div className={styles.uploadDate}>
                <p>გამოქვეყნების თარიღი *</p>
                <input
                  type="date"
                  selected={dateValue}
                  onChange={handleDataChange}
                  style={{
                    border: dateValue
                      ? "#14D81C solid 1px"
                      : "#E4E3EB solid 1px",
                  }}
                />
              </div>
              <div className={styles.categories}>
                <p>კატეგორია *</p>
                {data && (
                  <Select
                    options={data.data.map((e) => ({
                      value: e.title,
                      label: e.title,
                    }))}
                    isMulti
                    name="colors"
                    className={styles.multi_select_cat}
                    classNamePrefix="select"
                    placeholder="აირჩიეთ კატეგორია"
                    onChange={selectAnswer}
                  />
                )}
              </div>
            </div>
            <div className={styles.emailContainer}>
              <div className={styles.email}>
                <p>ელ–ფოსტა</p>
                <input
                  type="email"
                  placeholder="Example@redberry.ge"
                  value={emailValue}
                  onChange={handleEmailChange}
                  style={{
                    border: errors.EmailErr ? "1px solid red" : "2px solid #E4E3EB;",
                  }}
                />
                {errors.EmailErr && (
                  <div className={styles.info}>
                    {" "}
                    <img src={info_circle} alt="!" />
                    <p className={styles.error}> {errors.EmailErr}</p>
                  </div>
                )}
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

export default AddBlogPage;
