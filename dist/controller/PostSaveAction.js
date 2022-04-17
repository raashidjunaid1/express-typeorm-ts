"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSaveAction = void 0;
const typeorm_1 = require("typeorm");
const Post_1 = require("../entity/Post");
/**
 * Saves given post.
 */
async function postSaveAction(request, response) {
    // get a post repository to perform operations with post
    const postRepository = typeorm_1.getManager().getRepository(Post_1.Post);
    // create a real post object from post json object sent over http
    const newPost = postRepository.create(request.body);
    // save received post
    await postRepository.save(newPost);
    // return saved post back
    response.send(newPost);
}
exports.postSaveAction = postSaveAction;
//# sourceMappingURL=PostSaveAction.js.map