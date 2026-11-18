document.addEventListener('DOMContentLoaded', () => {
    const skillSwitch = document.getElementById('skill-switch');
    const skillsPanel = document.getElementById('skill-panel-habilidades');
    const technologiesPanel = document.getElementById('skill-panel-tecnologias');

    if (skillSwitch && skillsPanel && technologiesPanel) {
        skillSwitch.addEventListener('click', () => {
            const showTechnologies = skillSwitch.getAttribute('aria-checked') !== 'true';
            skillSwitch.setAttribute('aria-checked', String(showTechnologies));
            skillsPanel.classList.toggle('is-hidden', showTechnologies);
            technologiesPanel.classList.toggle('is-hidden', !showTechnologies);
            skillsPanel.setAttribute('aria-hidden', String(showTechnologies));
            technologiesPanel.setAttribute('aria-hidden', String(!showTechnologies));
            skillsPanel.inert = showTechnologies;
            technologiesPanel.inert = !showTechnologies;
        });
    }

    const moreProjectsButton = document.getElementById('load-more-projects');
    const moreProjectCards = document.querySelectorAll('.project-card-more');
    const categoryButtons = document.querySelectorAll('[data-category-filter]');
    const projectCards = document.querySelectorAll('[data-project-category]');
    let activeCategory = 'web';
    let showMoreWebProjects = false;
    let hasRenderedProjects = false;

    const demoLoader = document.getElementById('demo-loader');
    const demoSpinner = document.getElementById('demo-loader-spinner');
    let demoIsLoading = false;

    // Navegadores podem restaurar a página pelo back-forward cache com o loader aberto.
    window.addEventListener('pageshow', () => {
        if (!demoLoader) return;
        demoLoader.hidden = true;
        demoIsLoading = false;
    });

    if (demoSpinner) {
        for (let index = 0; index < 12; index += 1) {
            const bar = document.createElement('span');
            const pulse = document.createElement('i');
            bar.className = 'demo-loader-bar';
            bar.style.setProperty('--bar-index', index);
            bar.appendChild(pulse);
            demoSpinner.appendChild(bar);
        }
    }

    document.querySelectorAll('.demo-link').forEach((link) => {
        link.addEventListener('click', (event) => {
            if (!demoLoader || demoIsLoading || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            event.preventDefault();
            demoIsLoading = true;
            demoLoader.hidden = false;
            window.setTimeout(() => {
                window.location.assign(link.href);
            }, 3000);
        });
    });

    function renderProjects() {
        projectCards.forEach((card) => {
            const isCurrentCategory = card.dataset.projectCategory === activeCategory;
            const isCollapsedWebProject = card.classList.contains('project-card-more') && !showMoreWebProjects;
            const shouldShow = isCurrentCategory && !isCollapsedWebProject;
            const shouldAnimate = shouldShow && (card.hidden || !hasRenderedProjects);
            card.hidden = !shouldShow;

            if (shouldAnimate) {
                card.classList.remove('project-card-enter');
                void card.offsetWidth;
                card.classList.add('project-card-enter');
            }
        });
        hasRenderedProjects = true;

        if (moreProjectsButton) {
            const hasMoreInCategory = activeCategory === 'web' && moreProjectCards.length > 0;
            moreProjectsButton.hidden = !hasMoreInCategory;
            moreProjectsButton.setAttribute('aria-expanded', String(showMoreWebProjects));
            moreProjectsButton.textContent = showMoreWebProjects ? 'Mostrar menos' : 'Ver mais projetos';
        }
    }

    categoryButtons.forEach((button) => {
        button.addEventListener('click', () => {
            activeCategory = button.dataset.categoryFilter;
            showMoreWebProjects = false;
            categoryButtons.forEach((categoryButton) => {
                const isActive = categoryButton === button;
                categoryButton.classList.toggle('is-active', isActive);
                categoryButton.setAttribute('aria-pressed', String(isActive));
            });
            renderProjects();
        });
    });

    if (moreProjectsButton && moreProjectCards.length) {
        moreProjectsButton.addEventListener('click', () => {
            showMoreWebProjects = !showMoreWebProjects;
            renderProjects();
        });
    }

    renderProjects();
});
