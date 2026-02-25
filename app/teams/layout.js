export const metadata = {
    robots: {
        index: false,
        follow: false,
    },

    title: "Score Arena",
    description: "A sports score dashboard cearted by drexxy",
};

// Layout wrapper for team listing routes and metadata.
export default function TeamLayout({ children }) {
    return (
        <section>
            {children}
        </section>
    );
}
