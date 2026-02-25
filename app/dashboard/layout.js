export const metadata = {
    robots: {
        index: false,
        follow: false,
    },

    title: "Score Arena",
    description: "A sports score dashboard cearted by drexxy",
};

// Layout wrapper for dashboard routes and route-level metadata.
export default function DashboardLayout({ children }) {
    return (
        <section>
            {children}
        </section>
    );
}
