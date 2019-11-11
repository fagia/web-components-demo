import { setMode } from '@stencil/core';

setMode(elm => {
    return (elm as any).mode || elm.getAttribute('mode') || 'default';
});
