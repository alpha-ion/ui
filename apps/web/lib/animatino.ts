/*
 * Animation utility library with proper TypeScript types
 */

import { RefObject } from 'react';
import { useEffect } from 'react';

interface AnimationJob {
    isCanceled: boolean;
    run: () => Promise<void>;
}

async function* createAnimationQueue() {
    while (true) {
        let job: AnimationJob = yield undefined as any;
        if (!job.isCanceled) {
            await job.run();
        }
    }
}

export let animationQueue: AsyncGenerator<undefined, void, AnimationJob> = createAnimationQueue();
animationQueue.next(); // advance to first yield

interface AnimationStep {
    time: number;
    perform: () => void;
}

export function animate(steps: AnimationStep[]): () => void {
    let cancelCurrentStep: (() => void) | undefined;

    async function run() {
        for (let step of steps) {
            try {
                step.perform();
                let { promise, cancel } = sleep(step.time);
                cancelCurrentStep = cancel;
                await promise;
            } catch {
                break;
            }
        }
    }

    let job: AnimationJob = { isCanceled: false, run };
    animationQueue.next(job);

    return () => {
        job.isCanceled = true;
        if (cancelCurrentStep) {
            cancelCurrentStep();
        }
    };
}

function sleep(ms: number): { promise: Promise<void>; cancel: () => void } {
    let timeout: NodeJS.Timeout | undefined;
    let cancel: ((reason?: any) => void) | undefined;

    let promise = new Promise<void>((resolve, reject) => {
        timeout = setTimeout(resolve, ms);
        cancel = reject;
    });

    return {
        promise,
        cancel() {
            if (timeout) {
                clearTimeout(timeout);
            }
            if (cancel) {
                cancel();
            }
        }
    };
}

export function useIntersectionObserver(
    ref: RefObject<HTMLElement | null>,
    onIntersect: () => Function | void
): void {
    useEffect(() => {
        let element = ref.current;
        if (!element) {
            return;
        }

        let cancel: Function | void = undefined;
        let observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                cancel = onIntersect();
            } else if (typeof cancel === 'function') {
                cancel();
                cancel = undefined;
            }
        }, { threshold: 1 });

        observer.observe(element);
        return () => {
            if (typeof cancel === 'function') {
                cancel();
            }
            observer.unobserve(element!);
        };
    }, [ref, onIntersect]);
}