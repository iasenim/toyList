const cons = (a, b) => (fn) => fn(a, b);

const car = (c) => c((a, b) => a);

const cdr = (c) => {
    if(typeof(c) == "function")
        return c((a, b) => b);
    else
        throw new Error("Cannot cdr on an empty list");
};

const isNullList = (l) => l == void 0;

const length = (l) => {
    const length_iter = (ls, n) => {
        if(ls == void 0)
        {
            return n;
        }
        else
        {
            try{
                return length_iter(cdr(ls), n + 1);
            } catch(e)
            {
                throw new Error("length only works for a proper list");
            }
        }
    };
    return length_iter(l, 0);
};

const listRef = (l, n) => {
    if((l == void 0))
    {
        throw new Error("Out of range");
    }
    if(n == 0)
    {
        return car(l);
    }
    else
    {
        return listRef(cdr(l), n - 1);
    }
};

const iota = (count, start, step) => {
    if(count < 0)
    {
        throw new Error("count must be non-negative");
    }
    if(!start)
    {
        start = 0;
    }
    if(!step)
    {
        step = 1;
    }
    if(count <= 0 )
    {
        return void 0;
    }
    else
    {
        return cons(start, iota(count - 1, start + step, step)); 
    }
};

const arrayToList = (a) => {
    var list = void 0;
    for(let i = a.length - 1; i >= 0; --i)
    {
        list = cons(i, list);
    }
    return list;
};

const list = (...args) => arrayToList(args);

const listToArray = (lst) => {
    var a = [];
    forEach((x) => a.push(x), lst);
    return a;
};

const map = (fn, lst) => {
    if(isNullList(lst))
    {
        return void 0;
    }
    else
    {
        return cons(fn(car(lst)), map(fn, cdr(lst)));
    }
};

const reduce = (op, init, lst) => {
    if(isNullList(lst))
    {
        return init;
    }
    else
    {
        return reduce(op, op(init, car(lst)), cdr(lst));
    }
};
    
const forEach = (fn, lst) => {
    if(isNullList(lst))
    {
        return void 0;
    }
    else
    {
        fn(car(lst));
        return forEach(fn, cdr(lst));
    }
};

const isPair = (lst) => (typeof(lst) == "function" && 
                         (cdr(lst) == void 0 || typeof (cdr(lst)) == "function"));

export {cons, car, cdr, length, listRef, iota, 
        arrayToList, list, map, reduce, forEach};
