export const metadata = {
    robots: {
        index: false,
        follow: false,
    },

    title: "Score Arena",
    description: "A sports score dashboard cearted by drexxy",
};

// Layout wrapper for league listing routes and metadata.
export default function LeaguesLayout({ children }) {
    return (
        <section>
            {children}
        </section>
    );
}
