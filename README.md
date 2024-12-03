# vrv-rbac
Assignment: Role-Based Access Control (RBAC)

## Installation
1. Clone the repository
```bash
git clone https://github
```

2. Setup Backend
```bash
cd vrv-rbac/backend
npm install
npm start
```

3. Setup Frontend
```bash
cd vrv-rbac/frontend
npm install
npm run dev
```

## Example Use Case: CMS for a News Website

In this case, a CMS is used by a news agency to manage articles, categories, users, and more. Different roles would have different access permissions. Some example roles might include:

### Admin
- Full access to all content, users, and settings.
- Can create, edit, and delete articles, and user accounts.
- Can view system logs, configure settings, and assign roles.

### Editor
- Can create and edit articles, but not delete them.
- Can view the content published on the site and edit drafts, but cannot manage users or settings.

### Author
- Can only create new articles and submit them for approval.
- Cannot edit or delete existing content and cannot access other users’ work.

### Viewer
- Can view published content, but cannot create or edit articles.
- Typically a read-only role for visitors or authorized users.

## Documentation
[API Documentation](https://documenter.getpostman.com/view/19388406/2sAYBYeVY9)
