
export default {
    template: `
        <header class="app-header app-main flex space-between align-center">
            <div class="logo">
                <h3>Appsus</h3>
            </div>
            <nav class="nav-bar">
                <router-link to="/" active-class="active-link" exact>Home</router-link> |
                <router-link to="/mail" active-class="active-link" exact>Email</router-link> |
                <router-link to="/Keep" active-class="active-link" exact>Keep</router-link> |
                <router-link to="/book" active-class="active-link" exact>Books</router-link>

            </nav>
        </header>
    `,
}