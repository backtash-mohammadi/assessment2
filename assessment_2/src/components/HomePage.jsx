import React, { useState } from "react";
import RecipeList from "./RecipeList";

export default function HomePage({ recipes, onDelete, onEdit, onRate }) {
    const [search, setSearch] = useState("");

    // Filter recipes by search keyword in title, ingredients, or instructions
    const searchLower = search.toLowerCase();
    const filteredRecipes = recipes.filter(r =>
        r.title.toLowerCase().includes(searchLower) ||
        (Array.isArray(r.ingredients)
                ? r.ingredients.join(", ").toLowerCase().includes(searchLower)
                : (r.ingredients || "").toLowerCase().includes(searchLower)
        ) ||
        (Array.isArray(r.instructions)
                ? r.instructions.join("\n").toLowerCase().includes(searchLower)
                : (r.instructions || "").toLowerCase().includes(searchLower)
        )
    );
    console.log("Filtered recipes:", filteredRecipes);

    // Split by category
    const breakfast = filteredRecipes.filter(r => r.category === "Breakfast");
    const lunchDinner = filteredRecipes.filter(r => r.category === "Lunch/Dinner");
    const dessert = filteredRecipes.filter(r => r.category === "Dessert");

    return (
        <>
            <div style={{ textAlign: "center", marginBottom: "30px" }}>
                <input
                    type="text"
                    placeholder="Search recipes..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{
                        width: "340px",
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1.5px solid #b8e3e1",
                        fontSize: "17px"
                    }}
                />
            </div>
            <div style={{ display: "flex", gap: "18px", justifyContent: "center" }}>
                <RecipeList title="Breakfast" recipes={breakfast} onDelete={onDelete} onEdit={onEdit} onRate={onRate} />
                <RecipeList title="Lunch/Dinner" recipes={lunchDinner} onDelete={onDelete} onEdit={onEdit} onRate={onRate} />
                <RecipeList title="Dessert" recipes={dessert} onDelete={onDelete} onEdit={onEdit} onRate={onRate} />
            </div>
        </>
    );
}
