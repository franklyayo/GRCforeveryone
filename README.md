graph TD
    User((User / Browser))

    subgraph "Frontend (React Client Components)"
        UI[Dashboard / Tables / Charts]
        Forms[Modals / Forms]
    end

    subgraph "Backend (Next.js Server Environment)"
        Middleware{middleware.ts}
        ServerPages[Server Components / page.tsx]
        Actions[Server Actions]
        Auth[NextAuth / route.ts]
    end

    subgraph "Infrastructure & Database"
        Mongo[(MongoDB Atlas)]
        SMTP[SMTP / Nodemailer]
    end

    %% Authentication Flow
    User -->|Attempts Login| Middleware
    Middleware -->|Redirects unauthenticated| Auth
    Auth -->|Generates Token| Mongo
    Auth -->|Dispatches Magic Link| SMTP
    SMTP -->|Delivers Email| User

    %% Data Read Flow
    Middleware -->|Allows authenticated| ServerPages
    ServerPages -->|Securely fetches data| Mongo
    ServerPages -->|Passes serialized props| UI
    UI -->|Displays data| User

    %% Data Write Flow (Server Actions)
    User -->|Interacts with| Forms
    Forms -->|Submits data via HTML Form| Actions
    Actions -->|Mutates (Create/Update/Delete)| Mongo
    Actions -->|Calls revalidatePath()| ServerPages
    
    %% Styling
    classDef client fill:#eff6ff,stroke:#3b82f6,stroke-width:2px,color:#1e3a8a
    classDef server fill:#f0fdf4,stroke:#22c55e,stroke-width:2px,color:#14532d
    classDef database fill:#fffbeb,stroke:#f59e0b,stroke-width:2px,color:#78350f
    
    class UI,Forms client
    class Middleware,ServerPages,Actions,Auth server
    class Mongo database
