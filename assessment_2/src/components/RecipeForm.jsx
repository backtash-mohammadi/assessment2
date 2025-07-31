import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SaveImg from "./SaveImg";
import CategorySelect from "./CategorySelect";

function RecipeForm({ onSave, mode = "add", editingRecipe }) {
    const [title, setTitle] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState("");
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState("");
    const [resetImg, setResetImg] = useState(false);
    const navigate = useNavigate();

    // Prefill when editing
    useEffect(() => {
        if (mode === "edit" && editingRecipe) {
            setTitle(editingRecipe.title || "");
            setIngredients(
                Array.isArray(editingRecipe.ingredients)
                    ? editingRecipe.ingredients.join(", ")
                    : editingRecipe.ingredients || ""
            );
            setInstructions(
                Array.isArray(editingRecipe.instructions)
                    ? editingRecipe.instructions.join("\n")
                    : editingRecipe.instructions || ""
            );
            setImage(editingRecipe.image || null);
            setCategory(editingRecipe.category || "");
            setResetImg(false);
        }
        if (mode === "add") {
            setTitle("");
            setIngredients("");
            setInstructions("");
            setImage(null);
            setCategory("");
            setResetImg(false);
        }
    }, [editingRecipe, mode]);

    const handleFileSelect = (fileUrl) => {
        setImage(fileUrl);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !ingredients || !instructions || !category) {
            alert("Please fill out all required fields!");
            return;
        }
        const recipe = {
            id: mode === "edit" && editingRecipe ? editingRecipe.id : Date.now(),
            title,
            ingredients: ingredients.split(",").map(i => i.trim()),
            instructions: instructions.split("\n").filter(l => l.trim() !== ""),
            image,
            category
        };
        onSave(recipe);

        if (mode === "edit") {
            navigate("/"); // Go back to homepage after update
        }

        if (mode === "add") {
            setTitle("");
            setIngredients("");
            setInstructions("");
            setImage(null);
            setCategory("");
            setResetImg(true);
            setTimeout(() => setResetImg(false), 100);
        }
    };

    return (
        <div className="form-container">
            <form className="recipe-form" onSubmit={handleSubmit}>
                <h2>{mode === "edit" ? "Edit Recipe" : "Add New Recipe"}</h2>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                />
                <CategorySelect
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Ingredients (comma separated)"
                    value={ingredients}
                    onChange={e => setIngredients(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Instructions (one per line)"
                    value={instructions}
                    onChange={e => setInstructions(e.target.value)}
                    required
                />
                <SaveImg onFileSelect={handleFileSelect} reset={resetImg} />
                <button type="submit">{mode === "edit" ? "Update" : "Save"}</button>
            </form>
        </div>
    );
}

export default RecipeForm;
