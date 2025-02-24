# Organizo  
**A Task management website**  

A web-based Task Management Application where users can add, edit, delete, and reorder tasks seamlessly using a drag-and-drop interface. Tasks are categorized into To-Do, In Progress, and Done, ensuring a structured workflow. Changes are instantly saved to the database, maintaining real-time synchronization.

The application features a clean, minimalistic UI, built with React, Tailwind CSS, and Drag-and-Drop functionality, ensuring a smooth user experience across desktop and mobile devices. 🚀

---

## 📸 Project Screenshot  
![Organizo Screenshot](https://i.ibb.co/Vp9DMPpr/screenshot-11.png)  

 
 
---

## 🛠️ Main Technologies  

### **Frontend**
- **Languages**: HTML, CSS, JavaScript  
- **Frameworks/Libraries**:  
  - React.js  
  - Tailwind CSS  
  - React Router DOM  
  - Firebase Authentication  

### **Backend**  
- Node.js  
- Express.js  
- MongoDB  

  

---
 
## 🌟 Core Features  
1. **User Authentication**: Secure login with **Google Sign-In** via Firebase Authentication.  
2. **Real-Time Task Management**: Instantly add, edit, delete, and reorder tasks.  
3. **Drag-and-Drop Interface**: Move tasks between **To-Do, In Progress, and Done** sections.  
4. **Instant Database Synchronization**: All changes are saved in **real-time** using Firestore Database.  
5. **Task Categorization**: Organize tasks into **three categories** for better workflow management.  
6. **Reordering Tasks**: Users can change the order of tasks within each category.  
7. **Timestamps**: Automatically generated timestamps for task creation.  
8. **Responsive UI**: Fully optimized for **desktop and mobile** users.  
9. **Minimalistic Design**: Clean, user-friendly interface for seamless task tracking.  
10. **Secure Data Storage**: User tasks are stored safely under their authenticated account.

---

## 📦 Dependencies  

### **Core Dependencies**  
- `react-dnd-html5-backend`  
- `@tanstack/react-query`  
- `axios`  
- `firebase`  
- `react`  
- `react-dom`  
- `react-router-dom`  
- `react-toastify`  
- `sweetalert2`  

### **Additional Tools**  
- `@headlessui/react`
- `react-icons`  
- `react-tooltip`  

---

## 🚀 How to Run the Project Locally  

### Step 1: Clone the Repository  
Clone the repository to your local machine using the following command:  

```bash
git clone https://github.com/Majharulislam1/organizo.git
cd EdCare
```

### Step 2: Install Dependencies
Install all required dependencies for the project by running:

```bash
npm install
```

### Step 3: Configure Environment Variables
Create a .env file in the root directory and add the following environment variables:

```bash
VITE_API_KEY=your_api_key_here
VITE_AUTH_DOMAIN=your_auth_domain_here
VITE_PROJECT_ID=your_project_id_here
VITE_STORAGE_BUCKET=your_storage_bucket_here
VITE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
VITE_APP_ID=your_app_id_here
```
### Step 4: Start the Development Server
Run the project in development mode by executing:

```bash
npm start
```

### Step 5: Access the Application
Open your web browser and navigate to the following address:

```bash
http://localhost:3000
```


