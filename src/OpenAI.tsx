import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { useState } from "react";

type Message = {
  role: "user" | "assistant";
  text: string;
};

export const OpenAI = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [prompt, setPrompt] = useState<string>("");

  const handleSend = async () => {
    if (!prompt.trim()) return;

    setMessages((prev) => [...prev, { role: "user", text: prompt }]);

    try {
      const res = await fetch(
        "https://llm-chat-backend-black.vercel.app/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }),
        }
      );
      const data: { reply: string } = await res.json();

      setMessages((prev) => [...prev, { role: "assistant", text: data.reply }]);
    } catch (err) {
      console.error(err);
    }

    setPrompt("");
  };

  return (
    <Stack sx={{ height: "100vh", bgcolor: "#333333" }}>
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          px: 2,
          py: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {messages.map((msg, i) => (
          <Paper
            key={i}
            elevation={0}
            sx={{
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
              bgcolor: msg.role === "user" ? "#d1e7ff" : "#ffffff",
              p: 1.5,
              borderRadius: "12px",
              maxWidth: "70%",
              border: msg.role === "assistant" ? "1px solid #e0e0e0" : "none",
            }}
          >
            <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
              {msg.text}
            </Typography>
          </Paper>
        ))}
      </Box>
      <Box
        sx={{
          p: 2,
          bgcolor: "#333333",
          borderTop: "1px solid #e5e5e5",
          display: "flex",
          gap: 1,
        }}
      >
        <TextField
          fullWidth
          placeholder="Type your message..."
          variant="outlined"
          size="small"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px",
              backgroundColor: "#fafafa",
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            },
          }}
        />
        <Button
          onClick={handleSend}
          variant="contained"
          sx={{
            borderRadius: "20px",
            px: 3,
            textTransform: "none",
          }}
        >
          Send
        </Button>
      </Box>
      <Box sx={{ borderBottom: "1px solid #e5e5e5" }}>
        <Typography
          sx={{
            fontSize: "16px",
            fontStyle: "italic",
            textAlign: "center",
            p: 2,
            color: "#fff",
          }}
        >
          Developed by: Ali Muhammad
        </Typography>
      </Box>
    </Stack>
  );
};
