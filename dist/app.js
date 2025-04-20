"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.prisma = prisma;
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
// --- User CRUD Routes ---
// Create a user
app.post('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, role } = req.body;
        const user = yield prisma.user.create({
            data: { name, email, role: role || 'USER' },
        });
        res.status(201).json(user);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
// Get all users (with optional posts)
app.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany({
            include: { posts: req.query.includePosts === 'true' },
        });
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// Get a single user (with optional posts)
app.get('/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.findUnique({
            where: { id: parseInt(req.params.id) },
            include: { posts: req.query.includePosts === 'true' },
        });
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({ error: 'User not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// Update a user
app.put('/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, role } = req.body;
        const user = yield prisma.user.update({
            where: { id: parseInt(req.params.id) },
            data: { name, email, role },
        });
        res.json(user);
    }
    catch (error) {
        if (error.code === 'P2025') {
            res.status(400).json({ error: 'User not found' });
        }
        else {
            res.status(400).json({ error: error.message });
        }
    }
}));
// Delete a user
app.delete('/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.user.delete({
            where: { id: parseInt(req.params.id) },
        });
        res.status(204).send();
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
// --- Post CRUD Routes ---
// Create a post
app.post('/posts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, published, authorId } = req.body;
        const post = yield prisma.post.create({
            data: { title, content, published: published || false, authorId },
        });
        res.status(201).json(post);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
// Get all posts
app.get('/posts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield prisma.post.findMany({
            include: { author: req.query.includeAuthor === 'true' },
        });
        res.json(posts);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// Get a single post
app.get('/posts/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield prisma.post.findUnique({
            where: { id: parseInt(req.params.id) },
            include: { author: req.query.includeAuthor === 'true' },
        });
        if (post) {
            res.json(post);
        }
        else {
            res.status(404).json({ error: 'Post not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// Update a post
app.put('/posts/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, published, authorId } = req.body;
        const post = yield prisma.post.update({
            where: { id: parseInt(req.params.id) },
            data: { title, content, published, authorId },
        });
        res.json(post);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
// Delete a post
app.delete('/posts/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.post.delete({
            where: { id: parseInt(req.params.id) },
        });
        res.status(204).send();
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
