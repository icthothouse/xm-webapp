import { Observable } from 'rxjs';

const X_ENV_HEADER = 'X-ENV';
const TEST_API = 'assets/img/favicon.png';

/**
 * Returns current environment form X-ENV header variable
 */
export function getServerEnvironment(): Observable<string | null> {
    return new Observable((observer) => {
        const req = new XMLHttpRequest();
        req.onreadystatechange = (): void => {
            if (req.readyState == 4) {
                if (req.status == 200) {
                    const header = req.getResponseHeader(X_ENV_HEADER) || '';
                    observer.next(header.toLocaleLowerCase());
                } else {
                    observer.error(null);
                }
            }
        };
        req.open('GET', String(TEST_API));
        req.send(null);
    });
}
