export const app_error = function (req, res, status) {
    let title = '';
    let content = '';
    if (status === 404) {
        title = 'Página não encontrada - 404';
        content = 'Não foi possível encontar esta página.'; 
    } else {
        title = `Erro inesperado - ${status}`;
        content = req.body.message;
    }
    res.status(status);
    res.render('error', {
        title: title,
        content: content
    });
};