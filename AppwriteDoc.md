# Setup Appwrite DB for the project
Create an account in Appwrite (if not done already)

[https://cloud.appwrite.io/login](https://cloud.appwrite.io/login)

Login to your Appwrite account

Follow the documentation, and:
1. Create a project
2. Create a database
3. Create a media bucket
4. Create 2 collections Saves, Users and Posts
5. Create a file named `.env.local` in the project and save the projectId, databaseId, media bucketId, and all 3 collection ids (to be later user in appwrite [config](https://github.com/godsy07/LetsGetAlong/blob/godsy07-patch-1/src/lib/appwrite/config.ts) file)
6. Make sure give the collections permission to read, write, update and delete for any action to be performed by the app
7. Create attributes for each collection:
   - Posts collection attributes:
     <pre>
     caption(String), tags(String[]), imageId(String, required), imageUrl(URL, required), location(String)  
     </pre>
     Relationships Attributes:
     <code>
     likes (related with liked attribute in Users collection) (Many to Many)
     creator (related with posts attribute in Users collection) (Many to One)
     </code>
   - Users collection attributes:
     <pre>
     name(String, required), username(String), accountId(String, required), email(email, required), bio(String), imageId(String), imageUrl(URL, required)
     </pre>
   - Saves collection attributes:
     
     Relationships Attributes:
     <code>
     user (related with save attribute in Users collection) (Many to One)
     post (related with save attribute in Posts collection) (Many to One)
     </code>
