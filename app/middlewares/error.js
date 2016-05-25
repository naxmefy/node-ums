'use strict';

module.exports = function *(next) {
    try {
        yield next;

        if(this.request.fields === this.body) {
            this.response.status = 404;
        }

        if(this.response.status === 404 || !this.response.body) {
            if(this.log) {
                this.log.warn('404 - Route not found.', this.url);
            }

            this.throw(404);
        }

    } catch (err) {
        this.response.status = err.status || 500;
        if(this.log) {
            this.log.error(
                "Message:", err.message,
                "\nError:", JSON.stringify(err, null, 2),
                "\nStack:", err.stack
            );
        }

        const response = {
            message: err.message
        };

        if(this.app.env !== 'production') {
            response.error = err;
            response.stack = err.stack.split('\n');
        }

        this.response.body = response;
    }
};
