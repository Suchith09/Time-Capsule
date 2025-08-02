# Smart Notes App with GUI, Save/Load, and Encryption
# Dependencies: tkinter, cryptography

import tkinter as tk
from tkinter import messagebox, filedialog
from cryptography.fernet import Fernet
import os

# Generate or load encryption key
def load_key():
    if os.path.exists("secret.key"):
        return open("secret.key", "rb").read()
    else:
        key = Fernet.generate_key()
        with open("secret.key", "wb") as key_file:
            key_file.write(key)
        return key

def encrypt_message(message, key):
    return Fernet(key).encrypt(message.encode())

def decrypt_message(encrypted_message, key):
    try:
        return Fernet(key).decrypt(encrypted_message).decode()
    except:
        return "Error decrypting message. Wrong key or file corrupted."

# Save note to file
def save_note():
    title = title_entry.get()
    content = text_box.get("1.0", tk.END).strip()

    if not title or not content:
        messagebox.showwarning("Input Required", "Please provide both a title and content.")
        return

    encrypted = encrypt_message(content, secret_key)
    with open(f"{title}.note", "wb") as file:
        file.write(encrypted)
    messagebox.showinfo("Success", f"Note '{title}' saved securely.")

# Load note from file
def load_note():
    file_path = filedialog.askopenfilename(filetypes=[("Note Files", "*.note")])
    if not file_path:
        return
    with open(file_path, "rb") as file:
        encrypted_content = file.read()

    decrypted = decrypt_message(encrypted_content, secret_key)
    title_entry.delete(0, tk.END)
    title_entry.insert(0, os.path.splitext(os.path.basename(file_path))[0])
    text_box.delete("1.0", tk.END)
    text_box.insert(tk.END, decrypted)

# GUI setup
root = tk.Tk()
root.title("🔐 Smart Notes App")
root.geometry("500x400")
root.config(bg="#c4dfe8")

secret_key = load_key()

tk.Label(root, text="Note Title:", font=("Arial", 12)).pack(pady=(10, 0))
title_entry = tk.Entry(root, width=50, font=("Arial", 12))
title_entry.pack(pady=5)

tk.Label(root, text="Your Message:", font=("Arial", 12)).pack(pady=(10, 0))
text_box = tk.Text(root, width=58, height=10, font=("Arial", 11))
text_box.pack(pady=5)

btn_frame = tk.Frame(root, bg="#c4dfe8")
btn_frame.pack(pady=10)

save_btn = tk.Button(btn_frame, text="💾 Save Note", command=save_note, bg="#4caf50", fg="black", width=15)
save_btn.grid(row=0, column=0, padx=10)

load_btn = tk.Button(btn_frame, text="📂 Load Note", command=load_note, bg="#2196f3", fg="black", width=15)
load_btn.grid(row=0, column=1, padx=10)

root.mainloop()
