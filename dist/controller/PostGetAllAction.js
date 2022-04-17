"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postGetAllAction = void 0;
const typeorm_1 = require("typeorm");
const Post_1 = require("../entity/Post");
/**
 * Loads all posts from the database.
 */
async function postGetAllAction(request, response) {
    // get a post repository to perform operations with post
    const postRepository = typeorm_1.getRepository(Post_1.Post);
    // load posts
    const posts = await postRepository.find();
    // return loaded posts
    response.send(posts);
}
exports.postGetAllAction = postGetAllAction;
//# sourceMappingURL=PostGetAllAction.js.map