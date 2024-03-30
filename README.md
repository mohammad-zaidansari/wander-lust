# WanderLust Rental Marketplace

Welcome to WanderLust, a rental marketplace website where travelers can find unique accommodations around the world. This web application is built using MongoDB Atlas cloud database, Express.js, Node.js, HTML, CSS, and Bootstrap. It enables users to browse, create, edit, and delete listings for rental properties. Additionally, users can authenticate, leave reviews on listings, and manage their own listings.

## Deployment

This website is deployed using [Render.com](https://render.com/). You can visit the deployed site at [https://wander-lust-1.onrender.com/listings].

## Features

- User authentication and authorization (login, logout).
- Create, edit, and delete listings for rental properties.
- View detailed listings with images and descriptions.
- Leave reviews and ratings on listings.
- Responsive design using Bootstrap for optimal viewing on various devices.

## Installation and Local Development

To run this project locally, follow these steps:

1.  Clone the repository:

    ```bash
    git clone https://github.com/mohammad-zaidansari/wander-lust/tree/main
    ```

2.  Install dependencies:

    ```bash
    cd wanderlust
    npm install
    ```

3.  Set up environment variables:

        Create a `.env` file in the root directory and define the following variables:

        ```
CLOUD_NAME=>>>>>>>>>>>>>
CLOUD_API_KEY=>>>>>>>>>>>>>>>>
CLOUD_API_SECRET=>>>>>>>>>>>>>-qtY
MAP_TOKEN=pk.>>>>>>>>>>>>>>.>>>>>>>>>>
ATLASDB_URL=mongodb+srv://>>>>>>:>>>>>>>>>>@cluster0.jnsiyw4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
SECRET=>>>>>>>>>>>>>>%^&gJG
```

    Replace `YOUR_MONGODB_ATLAS_URI` with the connection URI for your MongoDB Atlas database.

4. Start the server:

   ```bash
   node app.js
   ```

5. Open your browser and navigate to `http://localhost:3000/listing` to access the website locally.

## Usage

1. **User Authentication**:

   - Register a new account or login with existing credentials.

2. **Browse Listings**:

   - Explore available rental listings on the homepage.
   - Click on a listing to view its details, images, and reviews.

3. **Create Listings**:

   - Authenticated users can create new listings by visiting the "Create Listing" page.
   - Fill in the required details and upload images to showcase the property.

4. **Edit Listings**:

   - Owners of listings can edit their properties by clicking the "Edit" button on the listing details page.

5. **Delete Listings**:

   - Owners of listings can delete their properties by clicking the "Delete" button on the listing details page.

6. **Leave Reviews**:

   - Authenticated users can leave reviews and ratings on listings to share their experiences with other users.

## Contributing

Contributions are welcome! If you encounter any bugs or have suggestions for improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
