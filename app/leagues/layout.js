export const metadata = {
    robots: {
        index: false,
        follow: false,
    },

    title: "Score Arena",
    description: "A sports score dashboard cearted by drexxy",
};

export default function LeaguesLayout({ children }) {
    return (
        <section>
            {children}
        </section>
    );
}