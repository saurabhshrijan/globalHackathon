import React,{useState,useEffect,useRef } from 'react';
import "./image.css";
function Image(props) {

    // useEffect(() => {
    //     let filteredArray = selectedFiles.reduce((file, current) => {
    //         const x = file.find(item => item.name === current.name);
    //         if (!x) {
    //             return file.concat([current]);
    //         } else {
    //             return file;
    //         }
    //     }, []);
    //     setValidFiles([...filteredArray]);
    
    // }, [selectedFiles]);

    const dragOver = (e) => {
        e.preventDefault();
    }
    
    const dragEnter = (e) => {
        e.preventDefault();
    }
    
    const dragLeave = (e) => {
        e.preventDefault();
    }
    
    const fileDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        console.log(files);
        if (files.length) {
            handleFiles(files);
        }
    }
    const handleFiles = (files) => {
        for(let i = 0; i < files.length; i++) {
            if (validateFile(files[i])) {
                // add to an array so we can display the name of file
                console.log("validating file",files[i]);
                setSelectedFiles(prevArray => [...prevArray, files[i]]);
            } else {
                let invalid = "";
                files[i]['invalid'] = true;
                setSelectedFiles(prevArray => [...prevArray, files[i]]);
                setUnsupportedFiles(prevArray => [...prevArray, files[i]]);
                setErrorMessage('File type not permitted');
                // add a new property called invalid
                // add to the same array so we can display the name of the file
                // set error message
            }
        }
    }
    const validateFile = (file) => {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/x-icon'];
        if (validTypes.indexOf(file.type) === -1) {
            return false;
        }
        return true;
    }
    const fileSize = (size) => {
        if (size === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(size) / Math.log(k));
        return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    const fileType = (fileName) => {
        return fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) || fileName;
    }
    const removeFile = (name) => {
        // find the index of the item
        // remove the item from array
    
        // const validFileIndex = selectedFiles.findIndex(e => e.name === name);
        // selectedFiles.splice(validFileIndex, 1);
        // // update validFiles array
        // setSelectedFiles([...selectedFiles]);
        const selectedFileIndex = selectedFiles.findIndex(e => e.name === name);
        selectedFiles.splice(selectedFileIndex, 1);
        setSelectedFiles([...selectedFiles]);
        
        const unsupportedFileIndex = unsupportedFiles.findIndex(e => e.name === name);
        if (unsupportedFileIndex !== -1) {
            unsupportedFiles.splice(unsupportedFileIndex, 1);
            setUnsupportedFiles([...unsupportedFiles]);
        }
    }
    const fileInputClicked = () => {
        fileInputRef.current.click();
    }
    const filesSelected = () => {
        if (fileInputRef.current.files.length) {
            handleFiles(fileInputRef.current.files);
        }
    }
    const uploadFiles = () => {
        //uploadModalRef.current.style.display = 'block';
        //uploadRef.current.innerHTML = 'File(s) Uploading...';
        const formData = new FormData();
        for (let i = 0; i < selectedFiles.length; i++) {
            //const formData = new FormData();
            formData.append('image', selectedFiles[i]);
            formData.append('key', 'add your API key here');
        }
        console.log("your data is uploaded",formData);
    }
  
    // const openImageModal = (file) => {
    //     const reader = new FileReader();
    //     modalRef.current.style.display = "block";
    //     reader.readAsDataURL(file);
    //     reader.onload = (e)=> {modalImageRef.current.style.backgroundImage = `url(${e.target.result})`}
    // }
    // const closeModal = () => {
    //     modalRef.current.style.display = "none";
    //     modalImageRef.current.style.backgroundImage = 'none';
    // }

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [unsupportedFiles, setUnsupportedFiles] = useState([]);
    const fileInputRef = useRef();
    // const modalImageRef = useRef();
    // const modalRef = useRef();
    // const [validFiles, setValidFiles] = useState([]); for duilcate file check
    return (
        <div className="container"onClick={fileInputClicked}>
            {unsupportedFiles.length === 0 && selectedFiles.length ? 
                <button className="file-upload-btn" onClick={() => uploadFiles()}>Upload Files</button> : ''} {unsupportedFiles.length ? 
                <p>Please remove all unsupported files.</p> : ''}
            <div className="drop-container"
            onDragOver={dragOver}
            onDragEnter={dragEnter}
            onDragLeave={dragLeave}
            onDrop={fileDrop}
            >
                <div className="drop-message">
                    <div className="upload-icon"></div>
                        Drag & Drop files here or click to upload
                    </div>
                </div>
                <input ref={fileInputRef} className="file-input" type="file" multiple onChange={filesSelected}/>
                <div className="file-display-container">
                {
                    selectedFiles.map((data, i) => 
                        <div className="file-status-bar" key={i}>
                            {/* <div onClick={!data.invalid ? () => openImageModal(data) : () => removeFile(data.name)}> */}
                            <div>
                            <div className="file-type-logo"></div>
                            <div className="file-type">{fileType(data.name)}</div>
                            <span className={`file-name ${data.invalid ? 'file-error' : ''}`}>{data.name}</span>
                            <span className="file-size">({fileSize(data.size)})</span> {data.invalid && <span className='file-error-message'>({errorMessage})</span>}
                            </div>
                        <div className="file-remove" onClick={() => removeFile(data.name)}>X</div>
                    </div>
                 )
                }
                </div>
                
            {/* //for overlays or preview of draged file */}
       
            {/* <div className="modal" ref={modalRef}>
                <div className="overlay"></div>
                <span className="close" onClick={(() => closeModal())}>X</span>
                <div className="modal-image" ref={modalImageRef}></div>
            </div> */}

            </div>       
    
    );
}

export default Image;