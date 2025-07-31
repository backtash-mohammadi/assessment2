import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import RecipeForm from "./components/RecipeForm";
import { useState, useEffect } from "react";

function App() {

    // Read from local storage on mount
    const [recipes, setRecipes] = useState(() => {
        const stored = localStorage.getItem("recipes");
        return stored ? JSON.parse(stored) : [];
    });
    const [editingRecipe, setEditingRecipe] = useState(null);

    // Save to local storage whenever recipes change
    useEffect(() => {
        localStorage.setItem("recipes", JSON.stringify(recipes));
    }, [recipes]);

    const addRecipe = (recipe) => setRecipes([...recipes, recipe]);
    const updateRecipe = (updated) => {
        setRecipes(recipes.map(r => r.id === updated.id ? updated : r));
        setEditingRecipe(null);
    };
    const deleteRecipe = (id) => setRecipes(recipes.filter(r => r.id !== id));

    return (
        <Router>
            <div className="navbar-wrapper">
                <Navbar />
            </div>
            <Routes>
                <Route path="/" element={
                    <HomePage
                        recipes={recipes}
                        onDelete={deleteRecipe}
                        onEdit={setEditingRecipe}
                    />
                } />
                <Route path="/addrecipe" element={
                    <RecipeForm
                        onSave={addRecipe}
                        mode="add"
                    />
                } />
                <Route path="/edit" element={
                    <RecipeForm
                        onSave={updateRecipe}
                        mode="edit"
                        editingRecipe={editingRecipe}
                    />
                } />
            </Routes>
        </Router>
    );
}

export default App;
