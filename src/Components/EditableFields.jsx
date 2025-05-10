import { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

function EditableField({ 
    value, 
    onSave, 
    label, 
    multiline = false, 
    buttonSize = "small", 
    textVariant = "body1" 
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedValue, setEditedValue] = useState(value);

    const handleCancel = () => {
        setIsEditing(false);
        setEditedValue(value);
    };

    const handleSave = () => {
        onSave(editedValue);
        setIsEditing(false);
    };

    return (
        <Box sx={{ mb: 2 }}>
            {isEditing ? (
                <>
                    <TextField
                        label={label}
                        multiline={multiline}
                        fullWidth={multiline}
                        rows={multiline ? 10 : 1}
                        value={editedValue}
                        onChange={(e) => setEditedValue(e.target.value)}
                        size="small"
                        sx={{ mb: 1 }}
                    />
                    <Box sx={{ display: "flex", gap: 2 }}>
                        <Button variant="contained" size={buttonSize} onClick={handleSave}>
                            Save
                        </Button>
                        <Button variant="outlined" size={buttonSize} onClick={handleCancel}>
                            Cancel
                        </Button>
                    </Box>
                </>
            ) : (
                <>
                    <Typography variant={textVariant} sx={{ textAlign: "justify" }}>
                        {value}
                    </Typography>
                    <Button 
                        size={buttonSize} 
                        variant="contained" 
                        sx={{ mt: multiline ? 2 : 0 }} 
                        onClick={() => setIsEditing(true)}
                    >
                        Edit
                    </Button>
                </>
            )}
        </Box>
    );
}

export default EditableField;
