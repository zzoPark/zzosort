const zzosort = (function() {

  const iParent = i => Math.floor((i - 1) / 2);
  const iLeftChild = i => 2 * i + 1;
  const iRightChild = i => 2 * i + 2;

  function sort(items, cmpf) {
    console.time('sort');
    const len = items.length;
    let maxdepth = Math.log(len) * 2;
    introSort(items, 0, len - 1, maxdepth, cmpf);
    console.timeEnd('sort');
  }

  function introSort(items, lo, hi, maxdepth, cmpf) {
    if (hi - lo < 16) {
      insertionSort(items, lo, hi, cmpf);
      return;
    }

    if (maxdepth === 0) {
      heapSort(items, lo, hi, cmpf);
      return;
    }

    const p = partition(items, lo, hi, cmpf);
    introSort(items, lo, p, maxdepth, cmpf);
    introSort(items, p + 1, hi, maxdepth, cmpf);
  }

  function insertionSort(items, left, right, cmpf) {
    let i, j, key;
    for (i = left + 1; i <= right; i++) {
      key = items[i];
      j = i - 1;
      while (j >= left && cmpf(items[j], key) > 0) {
        items[j + 1] = items[j];
        j = j - 1;
      }
      items[j + 1] = key;
    }
  }

  function heapSort(items, lo, hi, cmpf) {
    heapify(items, lo, hi, cmpf);
    let end = hi;
    while (end > lo) {
      swap(items, end, lo);
      end = end - 1;
      siftDown(items, lo, end, cmpf);
    }
  }

  function heapify(items, lo, hi, cmpf) {
    let start = iParent(hi);
    while (start >= lo) {
      siftDown(items, start, hi, cmpf);
      start = start - 1;
    }
  }

  function siftDown(items, start, end, cmpf) {
    let root = start, 
        child, toSwap;

    while (iLeftChild(root) <= end) {
      child = iLeftChild(root);
      toSwap = root;
      if (cmpf(items[toSwap], items[child]) < 0)
        toSwap = child;
      if ((child + 1) <= end && cmpf(items[toSwap], items[child+1]) < 0)
         toSwap = child + 1;
      if (toSwap === root)
        return;
      swap(items, root, toSwap);
      root = toSwap;
    }
  }

  function swap(items, a, b) {
    let temp = items[a];
    items[a] = items[b];
    items[b] = temp;
  }

  function pivot(items, lo, hi, cmpf) {
    const mid = Math.floor((lo + hi) / 2);
    if (cmpf(items[mid], items[lo]) < 0) 
      swap(items, lo, mid);
    if (cmpf(items[hi], items[lo]) < 0)
      swap(items, lo, hi);
    if (cmpf(items[mid], items[hi]) < 0)
      swap(items, mid, hi);
    return items[hi];
  }

  function partition(items, lo, hi, cmpf) {
    const pv = pivot(items, lo, hi, cmpf);
    let i = lo,
        j = hi;
    while (i < j) {
      while (cmpf(items[i], pv) < 0) i++;
      while (cmpf(items[j], pv) > 0) j--;
      if (i >= j) break;
      swap(items, i, j);
    }
    return j;
  }

  return { sort, introSort, heapSort, insertionSort };
})();

module.exports = zzosort;
