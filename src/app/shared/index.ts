// Backward compatibility
export { createRequestOption } from '@xm-ngx/entity';

export * from './auth/csrf.service';
export * from './auth/state-storage.service';
export * from './auth/account.service';
export * from './auth/auth-jwt.service';
export * from './auth/auth.service';
export * from './auth/principal.service';
export * from './auth/has-any-authority.directive';
export * from './language/i18n-jsf.pipe';
export * from './language/i18n-name.pipe';
export * from '../../../packages/translation/src/language.constants';
export * from '../../../packages/translation/src/language.helper';
export * from '../../../packages/translation/src/modules-language.helper';
export * from './language/find-language-from-key.pipe';
export * from './login/login.component';
export * from './auth/login.service';
export * from './register/register.component';
export * from './register/register.service';
export * from '@xm-ngx/components/pagination';
export * from './context/context.service';
export * from './user/account.model';
export * from './user/user.model';
export * from './user/user.service';
export * from '../../../packages/account/src/user-login-widget/login/user-login.model';
export * from '../../../packages/account/src/user-login-widget/login/user-login.service';
export * from '../../../packages/account/src/user-login-widget/login/user-login-form.component';
export * from './client/client.model';
export * from './client/client.service';
export * from './spec/config.service';
export * from './auth/user-route-access-service';
export * from './role/role.model';
export * from './role/role.service';
export * from './idp/idp.component';

export * from './privilege/privilege.service';
export * from './privilege/privilege.directive';
export * from './privilege/xmPrivilege.directive';

export * from './g-map/xmGMapApiInit.directive';

export * from './services/parse-by-path.service';

export * from '../../../packages/components/loader/loader.component';
export * from '@xm-ngx/components/per-page';
export * from '../../../packages/components/no-data/no-data.component';
export * from '../../../packages/components/maintenance/maintenance.component';
export * from './components/privacy-and-terms-dialog/privacy-and-terms-dialog.component';
export * from '../../../packages/components/password-needed/xm-password-needed.component';
export * from './components/xm-confirmation-dialog/xm-confirm-dialog.component';

export * from './password-strength-bar/password-strength-bar.component';

export * from './directives/word-autocomplete.directive';
export * from './directives/focus.directive';
export * from './directives/input-prevent-paste.directive';

export * from './shared-libs.module';
