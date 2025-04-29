import { useState } from "react";
import api from "../services/api";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import './CreateCategory.css';

const CreateCategory = () => {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return setError("Название категории не может быть пустым!");

        setLoading(true);
        setError("");

        try {
            await api.post("categories.json", { name });
            setName("");
            alert("Категория добавлена!");
        } catch (err) {
            setError("Ошибка при добавлении категории!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="Container">
            <h2>Create category </h2>
            <div className="content">
            <form onSubmit={handleSubmit}>
                <TextField
                    sx={{marginBottom:1}}
                    type="text"
                    label="Название категории"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Button variant={'contained'} type="submit" disabled={loading}>
                    {loading ? "Добавление..." : "Добавить"}
                </Button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
        </div>
    );
};

export default CreateCategory;