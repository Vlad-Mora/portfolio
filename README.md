# My App
What you will find in this repository is my first **TypeScript** app.

What I have done is make 3 main pages that are visible to the user:
1. Home
2. Projects
3. Contact

These 3 pages will help me demonstrate my skills and my knowledge of a Junior Frontend Developer

# File structure

I use this file structure in order to keep my code neat and readable.

This file structure is a preference and what I consider the best practice ⚠️

```TypeScript
// Libraries
import { React } from "react";

// Current folder
import { ... } from ".";

// Atoms
import { ... } from "@atoms/...";

// Molecules
import { ... } from "@molecules/...";

// Organisms
import { ... } from "@organisms/...";

// Templates
import { ... } from "@templates/...";

// Types
import { ... } from "@interfaces/...";

// Other

interface AppProps {
    ...
}

const App: React.FC<AppProps> = () => {
    // context
    
    // states

    // hooks

    // callbacks
    
    // useEffects

    // methods

    // mutable constants

    // returns with react code
}
```
