---
title: type
date: 2020-09-14T07:20:33.458Z
---

## Array

### Iteration

```bash
for i in "${!foo[@]}"; do
  printf "%s\t%s\n" "$i" "${foo[$i]}"
done
```

```bash
ITER=0
for I in ${FOO[@]}
do
  echo ${I} ${ITER}
  ITER=$(expr $ITER + 1)
done
```
