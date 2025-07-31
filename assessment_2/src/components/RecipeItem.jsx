import React from "react";
import { useNavigate } from "react-router-dom";
import StarRating from "./StarRating";
import "./RecipeItem.css";

export default function RecipeItem({ recipe, onDelete, onEdit, onRate }) {
    const navigate = useNavigate();

    const handleEdit = () => {
        onEdit(recipe);
        navigate("/edit");
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this recipe?")) {
            onDelete(recipe.id);
        }
    };

    return (
        <div className="recipe-item">
            <div>
                <span className="recipe-item-title">{recipe.title}</span>
                {recipe.ingredients && (
                    <p className="recipe-item-ingredients">
                        <b>Ingredients:</b> {Array.isArray(recipe.ingredients) ? recipe.ingredients.join(", ") : recipe.ingredients}
                    </p>
                )}
                {recipe.instructions && (
                    <div>
                        <span className="recipe-item-instructions-label">Instructions:</span>
                        <ol className="recipe-item-instructions-list">
                            {(Array.isArray(recipe.instructions) ? recipe.instructions : [recipe.instructions])
                                .filter(line => line && line.trim() !== "")
                                .map((step, idx) => (
                                    <li key={idx} className="recipe-item-instruction-step">
                                        {step}
                                    </li>
                                ))}
                        </ol>
                    </div>
                )}
            </div>

            {recipe.image && (
                <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="recipe-item-image"
                />
            )}

            <div className="recipe-item-buttons" style={{ justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    {/* Pass setRating that calls onRate to update global state */}
                    <StarRating
                        rating={recipe.rating || 0}
                        setRating={newRating => onRate(recipe.id, newRating)}
                    />
                </div>
                <div>
                    <button className="edit-btn" onClick={handleEdit}>Edit</button>
                    <button className="delete-btn" onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
    );
}
