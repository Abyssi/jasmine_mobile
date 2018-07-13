function bindMethods(context, methodNames) {
    if (!Array.isArray(methodNames)) {
        methodNames = [methodNames];
    }
    methodNames.map((method) => {
        try {
            context[method] = context[method].bind(context);
        } catch (e) {
            const cName = context.name ? (", " + context.name) : "";
            const mName = typeof method === "function" ? method.name : method;
            console.log("Error: " + e);
            throw new Error("Cannot bind method " + mName + " to the supplied context" + cName);
        }
        return null;
    });
}

module.exports = {bindMethods};