"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postGetByIdAction = void 0;
const typeorm_1 = require("typeorm");
const Post_1 = require("../entity/Post");
/**
 * Loads post by a given id.
 */
async function postGetByIdAction(request, response) {
    // get a post repository to perform operations with post
    const postRepository = typeorm_1.getManager().getRepository(Post_1.Post);
    // load a post by a given post id
    const post = await postRepository.findOne(request.params.id);
    // if post was not found return 404 to the client
    if (!post) {
        response.status(404);
        response.end();
        return;
    }
    // return loaded post
    response.send(post);
}
exports.postGetByIdAction = postGetByIdAction;
//# sourceMappingURL=PostGetByIdAction.js.map