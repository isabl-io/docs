var api_urls = {
    bee: '/_build/html/index.html#bee.',
    cli: ''
}

function getAndRemoveConfig(str = '') {
    const config = {}

    if (str) {
        str = str
            .replace(/:([\w-]+)=?([\w-]+)?/g, (m, key, value) => {
                config[key] = (value && value.replace(/&quot;/g, '')) || true
                return ''})
            .trim()
    }

    return { str, config }
}


window.$docsify = {
    // routerMode: 'history',
    coverpage: true,
    loadSidebar: true,
    subMaxLevel: 2,
    name: 'django-bee',
    repo: 'leukgen/django-bee',
    // noCompileLinks: ['_build/*', 'models.Individual'],
    markdown: {
        renderer: {
            link: function (href, title, text) {
                const { str, config } = getAndRemoveConfig(title)

                console.log(href, config, title)

                if (config.api) {
                    var url = api_urls[config.api];

                    console.log(`<a href="${url}${href}" title="${str}" target="_self">${text}</a>`)
                    return `<a href="${url}${href}" title="${str}" target="_self">${text}</a>`
                } else {
                    // console.log(href)
                    return this.origin.link(href, title, text)
                }

            }
        }
    },
}
