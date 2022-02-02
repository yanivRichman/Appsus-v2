export default {
  template: `
        <header>
        <section class="app-header app-main flex space-between align-center">
            <div class="logo">
                <h3>Appsus</h3>
            </div>
            <nav id="mainMenu" class="nav-bar main-menu-wrapper">
            <ul class="main-menu">
                <router-link to="/" active-class="active-link" exact>Home</router-link> 
                <router-link to="/mail" active-class="active-link" exact>Mails</router-link> 
                <router-link to="/Keep" active-class="active-link" exact>Notes</router-link> 
                <router-link to="/book" active-class="active-link" exact>Books</router-link>
            </ul>
            <button class="toggle-menu-btn fa" onclick="toggleMenu()" alt="Open main menu"></button>
            <div class="toggle-menu-screen screen" onclick="toggleMenu()" alt="toggle main menu"></div>
            </nav>
            </section>
        </header>
    `,
};
