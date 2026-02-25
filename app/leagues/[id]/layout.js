export const metadata = {
    robots: {
        index: false,
        follow: false,
    },

    title: "Score Arena",
    description: "A sports score dashboard cearted by drexxy",
};

// Layout wrapper for dynamic league detail routes and metadata.
export default function LeaguesLayoutId({ children }) {
    return (
        <section>
            {children}
        </section>
    );
}
