import {car, cdr, cons, isNullList, reverse, isPair} from 'toyList';

const splitWithItem = (item, lst) => {
    /*
    Given a list, use the item as a pivot to split the lst to two parts, returns
    a tree structure with item as the root 
    Example: 
    x = (1 2 3 4 5 6)
    splitWithItem(3, x) = (3 (1 2) (4 5 6))
    */
    if (isNullList(lst)) {
        return void 0;
    }

    var split_helper = (item, left_leaf, right_leaf) => {
        if (isNullList(right_leaf)) {
            return void 0;
        }
        else if (item === car(right_leaf)) {
            return cons(item, cons(left_leaf, cdr(right_leaf)));
        }
        else {
            return split_helper(item, cons(car(right_leaf), left_leaf), cdr(right_leaf));
        }
    };
    var result = split_helper(item, (void 0), lst);
    if (isNullList(result)) {
        return void 0;
    }
    var left_leaf = reverse(car(cdr(result)));
    var right_leaf = cdr(cdr(result));
    return cons(item, cons(left_leaf, right_leaf));
};

const splitWithLen = (len, lst) => {
    /*
     Given a lst and len, take the first element as the root of a tree, and
    these len number of element as the left subtree, and the rest as the right
    subtree 
    Example: 
    lst = (1 2 3 4 5) 
    splitWithLen(2, lst) = (1 (2 3) (4 5))
    */
    if (isNullList(lst)) {
        return void 0;
    }
    else {
        var root = car(lst);
        var l = cdr(lst);
        var left_leaf = void 0;
        for (let i = 0; i < len; ++i) {
            left_leaf = cons(car(l), left_leaf);
            l = cdr(l);
        }
        return cons(root, cons(reverse(left_leaf), l));
    }
};

const preorder = (tree) => {
    if (isNullList(tree)) {
        return void 0;
    }
    const preorder_helper = (a, lst) => {
        if (isNullList(lst)) {
            return;
        }
        else {
            a.push(car(lst));
        }

        if (isPair(cdr(lst))) {
            preorder_helper(a, car(cdr(lst)));
        }

        if (isPair(cdr(lst)) && isPair(cdr(cdr(lst)))) {
            preorder_helper(a, cdr(cdr(lst)));
        }

    };
    var a = [];
    preorder_helper(a, tree);
    return a;
};

const inorder = (tree) => {
    if (isNullList(tree)) {
        return void 0;
    }
    const inorder_helper = (a, lst) => {
        if (isNullList(lst)) {
            return;
        }

        if (isPair(cdr(lst))) {
            inorder_helper(a, car(cdr(lst)));
        }

        a.push(car(lst));

        if (isPair(cdr(lst)) && isPair(cdr(cdr(lst)))) {
            inorder_helper(a, cdr(cdr(lst)));
        }
    };
    var a = [];
    inorder_helper(a, tree);
    return a;

};

const postorder = (tree) => {
    if (isNullList(tree)) {
        return void 0;
    }
    const postorder_helper = (a, lst) => {
        if (isNullList(lst)) {
            return;
        }

        if (isPair(cdr(lst))) {
            postorder_helper(a, car(cdr(lst)));
        }

        if (isPair(cdr(lst)) && isPair(cdr(cdr(lst)))) {
            postorder_helper(a, cdr(cdr(lst)));
        }

        a.push(car(lst));
    };
    var a = [];
    postorder_helper(a, tree);
    return a;

};

const buildTree = (inOrder, preOrder) => {
    /*
    Constructed a binary tree from in-order and pre-order traversals
    */
    if (isNullList(inOrder) || isNullList(preOrder)) {
        return void 0;
    }
    var a = splitWithItem(car(preOrder), inOrder);
    var b = splitWithLen(length(car(cdr(a))), preOrder);
    return cons(car(preOrder), cons(buildTree(car(cdr(a)), car(cdr(b))), buildTree(cdr(cdr(a)), cdr(cdr(b)))));
};

var inList = list(4, 2, 5, 1, 8, 6, 3, 7);
var preList = list(1, 2, 4, 5, 3, 6, 8, 7);

var tree = buildTree(inList, preList);
var postArray = postorder(tree);
console.log(postArray); //should be [ 4, 5, 2, 8, 6, 7, 3, 1 ]
