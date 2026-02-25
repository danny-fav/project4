export const metadata = {
    robots: {
        index: false,
        follow: false,
    },

    title: "Score Arena",
    description: "A sports score dashboard cearted by drexxy",
};

// Layout wrapper for dynamic team detail routes and metadata.
export default function TeamLayoutId({ children }) {
    return (
        <section>
            {children}
        </section>
    );
}
