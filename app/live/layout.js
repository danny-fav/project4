export const metadata = {
    robots: {
        index: false,
        follow: false,
    },

    title: "Score Arena",
    description: "A sports score dashboard cearted by drexxy",
};

// Layout wrapper for live score routes and route-level metadata.
export default function LiveLayout({ children }) {
    return (
        <section>
            {children}
        </section>
    );
}
