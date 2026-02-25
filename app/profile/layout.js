export const metadata = {
    robots: {
        index: false,
        follow: false,
    },

    title: "Score Arena",
    description: "A sports score dashboard cearted by drexxy",
};

// Layout wrapper for profile routes and metadata.
export default function ProfileLayout({ children }) {
    return (
        <section>
            {children}
        </section>
    );
}
