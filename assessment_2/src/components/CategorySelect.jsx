import React from "react";

function CategorySelect({ value, onChange }) {
    return (
        <div>
            <label htmlFor="category"><b>Category:</b></label>
            <select
                id="category"
                value={value}
                onChange={onChange}
                required
                style={{ marginLeft: 10, padding: 6, borderRadius: 6, border: '1.5px solid #b8e3e1' }}
            >
                <option value="">Select...</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch/Dinner">Lunch/Dinner</option>
                <option value="Dessert">Dessert</option>
            </select>
        </div>
    );
}

export default CategorySelect;
