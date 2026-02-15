export type Technology = "JavaScript" | "TypeScript" | "React"

export interface Post { 
    frontmatter: {
        title: string;
        date: string;
        description: string;
        technologies: Technology[]
        slug: string;
    }
}