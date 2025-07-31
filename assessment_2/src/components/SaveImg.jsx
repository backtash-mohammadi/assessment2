import React, { useState, useEffect } from "react";

// Tutorial: https://www.geeksforgeeks.org/reactjs/how-to-upload-image-and-preview-it-using-reactjs/


function SaveImg({ onFileSelect, reset }) {
    const [file, setFile] = useState(null);

    function handleImageChange(e) {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFile(reader.result);           // This is a base64 Data URL
                onFileSelect(reader.result);      // Send it to RecipeForm
            };
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setFile(null);
            onFileSelect(null);
        }
    }

    useEffect(() => {
        if (reset) setFile(null);
    }, [reset]);

    return (
        <div>
            <h2>Add Image (optional):</h2>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {file && (
                <img
                    src={file}
                    alt="Uploaded preview"
                    style={{ maxWidth: 200, marginTop: 10, borderRadius: 8 }}
                />
            )}
        </div>
    );
}

export default SaveImg;