import RecipeItem from "./RecipeItem";

export default function RecipeList({ title, recipes, onDelete, onEdit, onRate }) {
    return (
        <div
            style={{
                flex: 1,
                background: "#b8e3e1",
                borderRadius: 10,
                padding: 20,
                minWidth: 440,
                minHeight: 600,
                margin: "0 10px"
            }}
        >
            <h3 style={{ textAlign: "center" }}>{title}</h3>
            {recipes.length === 0 ? <p>No recipes</p> :
                recipes.map(recipe => (
                    <RecipeItem key={recipe.id} recipe={recipe} onDelete={onDelete} onEdit={onEdit} onRate={onRate} />
                ))}
        </div>
    );
}
