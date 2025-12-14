import {  useEffect, useMemo, useState } from "react";
import { type FieldValues, type UseControllerProps, useController } from "react-hook-form"
import type { LocationIQSuggestion } from "../../../lib/types";
import { Box, debounce, List, ListItemButton, TextField, Typography } from "@mui/material";
import axios from "axios";

type Props<T extends FieldValues> = {
    label: string
} & UseControllerProps<T>
export default function LocationInput<T extends FieldValues>(props: Props<T>) {
    const { field, fieldState } = useController({ ...props });
    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState<LocationIQSuggestion[]>([]);
    const [inputValue, setInputValue] = useState(field.value || '');

    useEffect(() => {
        if(field.value && typeof field.value === 'object') {
            setInputValue(field.value.venue || '');
        }else{
            setInputValue(field.value || '');
        }
    }, [field.value]);

    const locationUrl = 'https://us1.locationiq.com/v1/search.php?key=pk.38d46085c13df4f58d8b64d11a181f3c&q='

    const fetchSuggstions = useMemo(() => 
    debounce(async (query: string) => {
        if(!query || query.length < 3) {
            setSuggestions([]);
            return;
        }
        setLoading(true);
        try {
            const response = await axios.get<LocationIQSuggestion[]>(`${locationUrl}${encodeURIComponent(query)}&format=json`);
            setSuggestions(response.data);
        } catch (error) {
            console.error("Error fetching location suggestions:", error);
        } finally {
            setLoading(false);
        }
    }, 500), [locationUrl]);

    const handleChange = async (value: string) => {
        field.onChange(value);
       await fetchSuggstions(value);
    }

    const handleSelect = (suggestion: LocationIQSuggestion) => {
        const city = suggestion.address?.city || suggestion.address?.town || suggestion.address?.village || '';
        const venue = suggestion.display_name;
        const latitude = parseFloat(suggestion.lat);
        const longitude = parseFloat(suggestion.lon);

        setInputValue(venue);
        field.onChange({ venue, city, latitude, longitude });
        setSuggestions([]);
    }

    return (
        <Box>
            <TextField
                {...props}
                label="Location"
                {...field}
                variant="outlined"
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : undefined}
                onChange={(e) => handleChange(e.target.value)}
                sx={{ width: "100%" }}
                value={inputValue}
            />
            {loading && <Typography>Loading suggestions...</Typography>}
            {suggestions.length > 0 && (
               <List sx={{ border: '1px solid #ccc', borderRadius: 1, mt: 1, maxHeight: 200, overflowY: 'auto' }}>
                {suggestions.map((suggestion) => (
                    <ListItemButton key={suggestion.place_id} onClick={() => handleSelect(suggestion)}>
                        {suggestion.display_name}
                    </ListItemButton>
                ))}
                </List>
            )}
        </Box>
    )
}