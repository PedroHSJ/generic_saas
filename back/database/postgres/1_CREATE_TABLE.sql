-- SET search_path TO NUTRI_FLOW;

-- SEQUENCES
CREATE SEQUENCE IF NOT EXISTS nutritionist_id_seq RESTART WITH 1;
CREATE SEQUENCE IF NOT EXISTS patient_id_seq RESTART WITH 1;
CREATE SEQUENCE IF NOT EXISTS patient_health_id_seq RESTART WITH 1;
CREATE SEQUENCE IF NOT EXISTS diet_id_seq RESTART WITH 1;
CREATE SEQUENCE IF NOT EXISTS meal_id_seq RESTART WITH 1;
CREATE SEQUENCE IF NOT EXISTS patient_log_id_seq RESTART WITH 1;
CREATE SEQUENCE IF NOT EXISTS subscription_id_seq RESTART WITH 1;
CREATE SEQUENCE IF NOT EXISTS plan_limit_id_seq RESTART WITH 1;
CREATE SEQUENCE IF NOT EXISTS setting_id_seq RESTART WITH 1;
CREATE SEQUENCE IF NOT EXISTS role_id_seq RESTART WITH 1;
CREATE SEQUENCE IF NOT EXISTS feature_id_seq RESTART WITH 1;
CREATE SEQUENCE IF NOT EXISTS permission_id_seq RESTART WITH 1;
CREATE SEQUENCE IF NOT EXISTS user_id_seq RESTART WITH 1;
-- FIM DAS SEQUENCES

-- ENUMS

-- ENUM COM OS TIPOS DE ASSINATURAS
CREATE TYPE SUBSCRIPTION_TYPE_ENUM AS ENUM ('BASIC', 'PRO');
CREATE TYPE PLAN_STATUS_ENUM AS ENUM ('TRIAL', 'ACTIVE', 'INACTIVE');
-- ENUM COM OS TIPOS DE REFEIÇÕES
CREATE TYPE MEAL_TYPE_ENUM AS ENUM ('BREAKFAST', 'LUNCH', 'DINNER');

-- FIM DOS ENUMS

-- TABELAS

-- TABELA DE USUÁRIOS
CREATE TABLE TB_USER (
    ID INTEGER PRIMARY KEY DEFAULT nextval('user_id_seq'), -- Identificador único do usuário
    NAME VARCHAR(255) NOT NULL, -- Nome do usuário
    EMAIL VARCHAR(255) NOT NULL UNIQUE, -- Email do usuário
    PICTURE VARCHAR(255), -- URL da foto do usuário
    CPF VARCHAR(14) UNIQUE, -- CPF do usuário
    PASSWORD VARCHAR(255) NOT NULL, -- Senha do usuário
    GOOGLE_LOGIN BOOLEAN DEFAULT FALSE, -- Se o usuário fez login com o Google
    TOKEN VARCHAR(255), -- Token da conta
    TOKEN_EXPIRATION TIMESTAMP, -- Data de expiração do token
    CREATED_AT TIMESTAMP DEFAULT NOW(), -- Data de criação do registro
    UPDATED_AT TIMESTAMP DEFAULT NOW(), -- Data de atualização do registro
    CREATED_BY INTEGER REFERENCES TB_USER(ID), -- Criado por
    UPDATED_BY INTEGER REFERENCES TB_USER(ID), -- Atualizado por
    ACTIVE BOOLEAN DEFAULT TRUE -- Status de atividade do usuário
);

-- TABELA DE CONFIGURAÇÕES
CREATE TABLE TB_SETTING(
    ID INTEGER PRIMARY KEY DEFAULT nextval('setting_id_seq'), -- Identificador único da configuração
    NAME VARCHAR(255) UNIQUE NOT NULL, -- Nome da configuração
    VALUE TEXT NOT NULL, -- Valor da configuração
    CREATED_AT TIMESTAMP DEFAULT NOW(), -- Data de criação do registro
    UPDATED_AT TIMESTAMP DEFAULT NOW(), -- Data de atualização do registro
    CREATED_BY INTEGER REFERENCES TB_USER(ID), -- Criado por
    UPDATED_BY INTEGER REFERENCES TB_USER(ID), -- Atualizado por
    ACTIVE BOOLEAN DEFAULT TRUE -- Status de atividade da configuração
);

-- TABELA DE PERFIS
CREATE TABLE TB_ROLE(
    ID INTEGER PRIMARY KEY DEFAULT nextval('role_id_seq'), -- Identificador único do perfil
    NAME VARCHAR(255) NOT NULL, -- Nome do perfil
    CREATED_AT TIMESTAMP DEFAULT NOW(), -- Data de criação do registro
    UPDATED_AT TIMESTAMP DEFAULT NOW(), -- Data de atualização do registro
    CREATED_BY INTEGER REFERENCES TB_USER(ID), -- Criado por
    UPDATED_BY INTEGER REFERENCES TB_USER(ID), -- Atualizado por
    ACTIVE BOOLEAN DEFAULT TRUE -- Status de atividade do perfil
);

-- TABELA DE FUNCIONALIDADES
CREATE TABLE TB_FEATURE(
    ID INTEGER PRIMARY KEY DEFAULT nextval('feature_id_seq'), -- Identificador único da funcionalidade
    NAME VARCHAR(255) NOT NULL, -- Nome da funcionalidade
    CREATED_AT TIMESTAMP DEFAULT NOW(), -- Data de criação do registro
    UPDATED_AT TIMESTAMP DEFAULT NOW(), -- Data de atualização do registro
    CREATED_BY INTEGER REFERENCES TB_USER(ID), -- Criado por
    UPDATED_BY INTEGER REFERENCES TB_USER(ID), -- Atualizado por
    ACTIVE BOOLEAN DEFAULT TRUE -- Status de atividade da funcionalidade
);

-- TABELA DE PERMISSOES
CREATE TABLE TB_PERMISSION(
    ID INTEGER PRIMARY KEY DEFAULT nextval('permission_id_seq'), -- Identificador único da permissão
    ROLE_ID INTEGER NOT NULL REFERENCES TB_ROLE(ID), -- Referência ao perfil
    FEATURE_ID INTEGER NOT NULL REFERENCES TB_FEATURE(ID), -- Referência à funcionalidade
    CREATED_AT TIMESTAMP DEFAULT NOW(), -- Data de criação do registro
    UPDATED_AT TIMESTAMP DEFAULT NOW(), -- Data de atualização do registro
    CREATED_BY INTEGER REFERENCES TB_USER(ID), -- Criado por
    UPDATED_BY INTEGER REFERENCES TB_USER(ID), -- Atualizado por
    ACTIVE BOOLEAN DEFAULT TRUE -- Status de atividade da permissão
);

-- TABELA DE NUTRICIONISTAS
CREATE TABLE TB_NUTRITIONIST(
    ID INTEGER PRIMARY KEY DEFAULT nextval('nutritionist_id_seq'), -- Identificador único do nutricionista
    NAME VARCHAR(255) NOT NULL, -- Nome do nutricionista
    EMAIL VARCHAR(255) NOT NULL, -- Email do nutricionista
    PASSWORD VARCHAR(255) NOT NULL, -- Senha do nutricionista
    CRN VARCHAR(20) UNIQUE NOT NULL, -- Registro do nutricionista
    CREATED_AT TIMESTAMP DEFAULT NOW(), -- Data de criação do registro
    UPDATED_AT TIMESTAMP DEFAULT NOW(), -- Data de atualização do registro
    CREATED_BY INTEGER REFERENCES TB_USER(ID), -- Criado por
    UPDATED_BY INTEGER REFERENCES TB_USER(ID), -- Atualizado por
    ACTIVE BOOLEAN DEFAULT TRUE -- Status de atividade do nutricionista
);

-- TABELA DE PACIENTES
CREATE TABLE TB_PATIENT(
    ID INTEGER PRIMARY KEY DEFAULT nextval('patient_id_seq'), -- Identificador único do paciente
    NAME VARCHAR(255) NOT NULL, -- Nome do paciente
    CPF VARCHAR(14) UNIQUE NOT NULL, -- CPF do paciente
    EMAIL VARCHAR(255) NOT NULL, -- Email do paciente
    PASSWORD VARCHAR(255) NOT NULL, -- Senha do paciente
    PHONE VARCHAR(20) NOT NULL, -- Telefone do paciente
    BIRTH_DATE DATE NOT NULL, -- Data de nascimento do paciente
    CREATED_AT TIMESTAMP DEFAULT NOW(), -- Data de criação do registro
    UPDATED_AT TIMESTAMP DEFAULT NOW(), -- Data de atualização do registro
    CREATED_BY INTEGER REFERENCES TB_USER(ID), -- Criado por
    UPDATED_BY INTEGER REFERENCES TB_USER(ID), -- Atualizado por
    ACTIVE BOOLEAN DEFAULT TRUE -- Status de atividade do paciente
);

-- TABELA PARA ARMAZENAR OS DADOS DE SAÚDE DO PACIENTE
CREATE TABLE TB_PATIENT_HEALTH (
    ID INTEGER PRIMARY KEY DEFAULT nextval('patient_health_id_seq'), -- Identificador único do registro de saúde
    PATIENT_ID INTEGER NOT NULL REFERENCES TB_PATIENT(ID), -- Referência ao paciente
    WEIGHT DECIMAL(5,2) NOT NULL, -- Peso do paciente
    HEIGHT DECIMAL(5,2) NOT NULL, -- Altura do paciente
    CREATED_AT TIMESTAMP DEFAULT NOW(), -- Data de criação do registro
    UPDATED_AT TIMESTAMP DEFAULT NOW(), -- Data de atualização do registro
    CREATED_BY INTEGER REFERENCES TB_USER(ID), -- Criado por
    UPDATED_BY INTEGER REFERENCES TB_USER(ID), -- Atualizado por
    ACTIVE BOOLEAN DEFAULT TRUE -- Status de atividade do registro
);

-- TABELA DE DIETAS
CREATE TABLE TB_DIET (
    ID INTEGER PRIMARY KEY DEFAULT nextval('diet_id_seq'), -- Identificador único da dieta
    PATIENT_ID INTEGER NOT NULL REFERENCES TB_PATIENT(ID), -- Referência ao paciente
    NUTRITIONIST_ID INTEGER NOT NULL REFERENCES TB_NUTRITIONIST(ID), -- Referência ao nutricionista
    TITLE VARCHAR(255) NOT NULL, -- Título da dieta
    DESCRIPTION TEXT NOT NULL, -- Descrição da dieta
    DURANTION_DAYS INTEGER NOT NULL, -- Duração da dieta em dias
    DAILY_CALORIES DECIMAL(5,2) NOT NULL, -- Calorias diárias da dieta
    CREATED_AT TIMESTAMP DEFAULT NOW(), -- Data de criação do registro
    UPDATED_AT TIMESTAMP DEFAULT NOW(), -- Data de atualização do registro
    CREATED_BY INTEGER REFERENCES TB_USER(ID), -- Criado por
    UPDATED_BY INTEGER REFERENCES TB_USER(ID), -- Atualizado por
    ACTIVE BOOLEAN DEFAULT TRUE -- Status de atividade da dieta
);

-- TABELA DE REFEIÇÕES
CREATE TABLE TB_MEAL (
    ID INTEGER PRIMARY KEY DEFAULT nextval('meal_id_seq'), -- Identificador único da refeição
    DIET_ID INTEGER NOT NULL REFERENCES TB_DIET(ID), -- Referência à dieta
    MEAL_TYPE MEAL_TYPE_ENUM NOT NULL, -- Tipo de refeição
    DESCRIPTION TEXT NOT NULL, -- Descrição da refeição
    PHOTO_URL VARCHAR(255), -- URL da foto da refeição
    CREATED_AT TIMESTAMP DEFAULT NOW(), -- Data de criação do registro
    UPDATED_AT TIMESTAMP DEFAULT NOW(), -- Data de atualização do registro
    CREATED_BY INTEGER REFERENCES TB_USER(ID), -- Criado por
    UPDATED_BY INTEGER REFERENCES TB_USER(ID), -- Atualizado por
    ACTIVE BOOLEAN DEFAULT TRUE -- Status de atividade da refeição
);

-- TABELA DE REGISTRO DO PACIENTE
CREATE TABLE TB_PATIENT_LOG (
    ID INTEGER PRIMARY KEY DEFAULT nextval('patient_log_id_seq'), -- Identificador único do registro
    MEAL_ID INTEGER NOT NULL REFERENCES TB_MEAL(ID), -- Referência à refeição
    LOGGED_DATE DATE NOT NULL, -- Data do registro
    CONSUMED BOOLEAN NOT NULL, -- Se o paciente consumiu ou não a refeição
    NOTES TEXT, -- Observações do paciente
    CREATED_AT TIMESTAMP DEFAULT NOW(), -- Data de criação do registro
    UPDATED_AT TIMESTAMP DEFAULT NOW(), -- Data de atualização do registro
    CREATED_BY INTEGER REFERENCES TB_USER(ID), -- Criado por
    UPDATED_BY INTEGER REFERENCES TB_USER(ID), -- Atualizado por
    ACTIVE BOOLEAN DEFAULT TRUE -- Status de atividade do registro
);

-- TABELA DE ASSINATURAS
CREATE TABLE TB_SUBSCRIPTION (
    ID INTEGER PRIMARY KEY DEFAULT nextval('subscription_id_seq'), -- Identificador único da assinatura
    NUTRICIONIST_ID INTEGER NOT NULL REFERENCES TB_NUTRITIONIST(ID), -- Referência ao nutricionista
    STRIPE_SUBSCRIPTION_ID VARCHAR(255) NOT NULL UNIQUE, -- Identificador da assinatura no Stripe
    PLAN SUBSCRIPTION_TYPE_ENUM NOT NULL, -- Tipo de plano da assinatura
    STATUS PLAN_STATUS_ENUM NOT NULL, -- Status da assinatura
    CURRENT_PERIOD_END TIMESTAMP NOT NULL, -- Fim do período atual da assinatura
    CREATED_AT TIMESTAMP DEFAULT NOW(), -- Data de criação do registro
    UPDATED_AT TIMESTAMP DEFAULT NOW(), -- Data de atualização do registro
    CREATED_BY INTEGER REFERENCES TB_USER(ID), -- Criado por
    UPDATED_BY INTEGER REFERENCES TB_USER(ID), -- Atualizado por
    ACTIVE BOOLEAN DEFAULT TRUE -- Status de atividade da assinatura
);

-- TABELA DE LIMITES DE PACIENTES POR PLANO
CREATE TABLE TB_PLAN_LIMIT (
    ID INTEGER PRIMARY KEY DEFAULT nextval('plan_limit_id_seq'), -- Identificador único do limite de plano
    NUTRICIONIST_ID INTEGER NOT NULL REFERENCES TB_NUTRITIONIST(ID), -- Referência ao nutricionista
    PLAN SUBSCRIPTION_TYPE_ENUM NOT NULL, -- Tipo de plano
    MAX_PATIENTS INTEGER NOT NULL, -- Número máximo de pacientes permitidos
    PATIENTS_COUNT INTEGER DEFAULT 0, -- Contagem atual de pacientes
    CREATED_AT TIMESTAMP DEFAULT NOW(), -- Data de criação do registro
    UPDATED_AT TIMESTAMP DEFAULT NOW(), -- Data de atualização do registro
    CREATED_BY INTEGER REFERENCES TB_USER(ID), -- Criado por
    UPDATED_BY INTEGER REFERENCES TB_USER(ID), -- Atualizado por
    ACTIVE BOOLEAN DEFAULT TRUE -- Status de atividade do limite de plano
);

-- TABELA DE ESTADOS
CREATE TABLE TB_STATE (
    ID INTEGER PRIMARY KEY, -- Identificador único do estado
    NAME VARCHAR(255) NOT NULL, -- Nome do estado
    ABBREVIATION VARCHAR(2) NOT NULL, -- Abreviação do estado
    LATITUDE DECIMAL(10,6) NOT NULL, -- Latitude do estado
    LONGITUDE DECIMAL(10,6) NOT NULL, -- Longitude do estado
    CREATED_AT TIMESTAMP DEFAULT NOW(), -- Data de criação do registro
    UPDATED_AT TIMESTAMP DEFAULT NOW(), -- Data de atualização do registro
    CREATED_BY INTEGER REFERENCES TB_USER(ID), -- Criado por
    UPDATED_BY INTEGER REFERENCES TB_USER(ID), -- Atualizado por
    ACTIVE BOOLEAN DEFAULT TRUE -- Status de atividade do estado
);
-- TABELA DE MUNICÍPIOS
CREATE TABLE TB_TOWNSHIP (
    ID INTEGER PRIMARY KEY, -- Identificador único do município
    NAME VARCHAR(255) NOT NULL, -- Nome do município
    STATE_ID INTEGER NOT NULL REFERENCES TB_STATE(ID), -- Referência ao estado
    LATITUDE DECIMAL(10,6) NOT NULL, -- Latitude do município
    LONGITUDE DECIMAL(10,6) NOT NULL, -- Longitude do município
    CREATED_AT TIMESTAMP DEFAULT NOW(), -- Data de criação do registro
    UPDATED_AT TIMESTAMP DEFAULT NOW(), -- Data de atualização do registro
    CREATED_BY INTEGER REFERENCES TB_USER(ID), -- Criado por
    UPDATED_BY INTEGER REFERENCES TB_USER(ID), -- Atualizado por
    ACTIVE BOOLEAN DEFAULT TRUE, -- Status de atividade do município
    ID_WITHOUT_DV INTEGER -- ID sem DIGITO VERIFICADOR
);

-- FIM DAS TABELAS

-- COMENTÁRIOS
COMMENT ON COLUMN TB_USER.ID IS 'Identificador único do usuário';
COMMENT ON COLUMN TB_USER.NAME IS 'Nome do usuário';
COMMENT ON COLUMN TB_USER.EMAIL IS 'Email do usuário';
COMMENT ON COLUMN TB_USER.PASSWORD IS 'Senha do usuário';
COMMENT ON COLUMN TB_USER.CPF IS 'CPF do usuário';
COMMENT ON COLUMN TB_USER.PICTURE IS 'URL da foto do usuário';
COMMENT ON COLUMN TB_USER.GOOGLE_LOGIN IS 'Se o usuário fez login com o Google';
COMMENT ON COLUMN TB_USER.CREATED_AT IS 'Data de criação do registro';
COMMENT ON COLUMN TB_USER.UPDATED_AT IS 'Data de atualização do registro';
COMMENT ON COLUMN TB_USER.CREATED_BY IS 'Criado por';
COMMENT ON COLUMN TB_USER.UPDATED_BY IS 'Atualizado por';
COMMENT ON COLUMN TB_USER.ACTIVE IS 'Status de atividade do usuário';

COMMENT ON COLUMN TB_SETTING.ID IS 'Identificador único da configuração';
COMMENT ON COLUMN TB_SETTING.NAME IS 'Nome da configuração';
COMMENT ON COLUMN TB_SETTING.VALUE IS 'Valor da configuração';
COMMENT ON COLUMN TB_SETTING.CREATED_AT IS 'Data de criação do registro';
COMMENT ON COLUMN TB_SETTING.UPDATED_AT IS 'Data de atualização do registro';
COMMENT ON COLUMN TB_SETTING.CREATED_BY IS 'Criado por';
COMMENT ON COLUMN TB_SETTING.UPDATED_BY IS 'Atualizado por';
COMMENT ON COLUMN TB_SETTING.ACTIVE IS 'Status de atividade da configuração';

COMMENT ON COLUMN TB_ROLE.ID IS 'Identificador único do perfil';
COMMENT ON COLUMN TB_ROLE.NAME IS 'Nome do perfil';
COMMENT ON COLUMN TB_ROLE.CREATED_AT IS 'Data de criação do registro';
COMMENT ON COLUMN TB_ROLE.UPDATED_AT IS 'Data de atualização do registro';
COMMENT ON COLUMN TB_ROLE.CREATED_BY IS 'Criado por';
COMMENT ON COLUMN TB_ROLE.UPDATED_BY IS 'Atualizado por';
COMMENT ON COLUMN TB_ROLE.ACTIVE IS 'Status de atividade do perfil';

COMMENT ON COLUMN TB_FEATURE.ID IS 'Identificador único da funcionalidade';
COMMENT ON COLUMN TB_FEATURE.NAME IS 'Nome da funcionalidade';
COMMENT ON COLUMN TB_FEATURE.CREATED_AT IS 'Data de criação do registro';
COMMENT ON COLUMN TB_FEATURE.UPDATED_AT IS 'Data de atualização do registro';
COMMENT ON COLUMN TB_FEATURE.CREATED_BY IS 'Criado por';
COMMENT ON COLUMN TB_FEATURE.UPDATED_BY IS 'Atualizado por';
COMMENT ON COLUMN TB_FEATURE.ACTIVE IS 'Status de atividade da funcionalidade';

COMMENT ON COLUMN TB_PERMISSION.ID IS 'Identificador único da permissão';
COMMENT ON COLUMN TB_PERMISSION.ROLE_ID IS 'Referência ao perfil';
COMMENT ON COLUMN TB_PERMISSION.FEATURE_ID IS 'Referência à funcionalidade';
COMMENT ON COLUMN TB_PERMISSION.CREATED_AT IS 'Data de criação do registro';
COMMENT ON COLUMN TB_PERMISSION.UPDATED_AT IS 'Data de atualização do registro';
COMMENT ON COLUMN TB_PERMISSION.CREATED_BY IS 'Criado por';
COMMENT ON COLUMN TB_PERMISSION.UPDATED_BY IS 'Atualizado por';
COMMENT ON COLUMN TB_PERMISSION.ACTIVE IS 'Status de atividade da permissão';

COMMENT ON COLUMN TB_NUTRITIONIST.ID IS 'Identificador único do nutricionista';
COMMENT ON COLUMN TB_NUTRITIONIST.NAME IS 'Nome do nutricionista';
COMMENT ON COLUMN TB_NUTRITIONIST.EMAIL IS 'Email do nutricionista';
COMMENT ON COLUMN TB_NUTRITIONIST.PASSWORD IS 'Senha do nutricionista';
COMMENT ON COLUMN TB_NUTRITIONIST.CRN IS 'Registro do nutricionista';
COMMENT ON COLUMN TB_NUTRITIONIST.CREATED_AT IS 'Data de criação do registro';
COMMENT ON COLUMN TB_NUTRITIONIST.UPDATED_AT IS 'Data de atualização do registro';
COMMENT ON COLUMN TB_NUTRITIONIST.CREATED_BY IS 'Criado por';
COMMENT ON COLUMN TB_NUTRITIONIST.UPDATED_BY IS 'Atualizado por';
COMMENT ON COLUMN TB_NUTRITIONIST.ACTIVE IS 'Status de atividade do nutricionista';

COMMENT ON COLUMN TB_PATIENT.ID IS 'Identificador único do paciente';
COMMENT ON COLUMN TB_PATIENT.NAME IS 'Nome do paciente';
COMMENT ON COLUMN TB_PATIENT.EMAIL IS 'Email do paciente';
COMMENT ON COLUMN TB_PATIENT.PASSWORD IS 'Senha do paciente';
COMMENT ON COLUMN TB_PATIENT.PHONE IS 'Telefone do paciente';
COMMENT ON COLUMN TB_PATIENT.CPF IS 'CPF do paciente';
COMMENT ON COLUMN TB_PATIENT.BIRTH_DATE IS 'Data de nascimento do paciente';
COMMENT ON COLUMN TB_PATIENT.CREATED_AT IS 'Data de criação do registro';
COMMENT ON COLUMN TB_PATIENT.UPDATED_AT IS 'Data de atualização do registro';
COMMENT ON COLUMN TB_PATIENT.CREATED_BY IS 'Criado por';
COMMENT ON COLUMN TB_PATIENT.UPDATED_BY IS 'Atualizado por';
COMMENT ON COLUMN TB_PATIENT.ACTIVE IS 'Status de atividade do paciente';

COMMENT ON COLUMN TB_PATIENT_HEALTH.ID IS 'Identificador único do registro de saúde';
COMMENT ON COLUMN TB_PATIENT_HEALTH.PATIENT_ID IS 'Referência ao paciente';
COMMENT ON COLUMN TB_PATIENT_HEALTH.WEIGHT IS 'Peso do paciente';
COMMENT ON COLUMN TB_PATIENT_HEALTH.HEIGHT IS 'Altura do paciente';
COMMENT ON COLUMN TB_PATIENT_HEALTH.CREATED_AT IS 'Data de criação do registro';
COMMENT ON COLUMN TB_PATIENT_HEALTH.UPDATED_AT IS 'Data de atualização do registro';
COMMENT ON COLUMN TB_PATIENT_HEALTH.CREATED_BY IS 'Criado por';
COMMENT ON COLUMN TB_PATIENT_HEALTH.UPDATED_BY IS 'Atualizado por';
COMMENT ON COLUMN TB_PATIENT_HEALTH.ACTIVE IS 'Status de atividade do registro';

COMMENT ON COLUMN TB_DIET.ID IS 'Identificador único da dieta';
COMMENT ON COLUMN TB_DIET.PATIENT_ID IS 'Referência ao paciente';
COMMENT ON COLUMN TB_DIET.NUTRITIONIST_ID IS 'Referência ao nutricionista';
COMMENT ON COLUMN TB_DIET.TITLE IS 'Título da dieta';
COMMENT ON COLUMN TB_DIET.DESCRIPTION IS 'Descrição da dieta';
COMMENT ON COLUMN TB_DIET.DURANTION_DAYS IS 'Duração da dieta em dias';
COMMENT ON COLUMN TB_DIET.DAILY_CALORIES IS 'Calorias diárias da dieta';
COMMENT ON COLUMN TB_DIET.CREATED_AT IS 'Data de criação do registro';
COMMENT ON COLUMN TB_DIET.UPDATED_AT IS 'Data de atualização do registro';
COMMENT ON COLUMN TB_DIET.CREATED_BY IS 'Criado por';
COMMENT ON COLUMN TB_DIET.UPDATED_BY IS 'Atualizado por';
COMMENT ON COLUMN TB_DIET.ACTIVE IS 'Status de atividade da dieta';

COMMENT ON COLUMN TB_MEAL.ID IS 'Identificador único da refeição';
COMMENT ON COLUMN TB_MEAL.DIET_ID IS 'Referência à dieta';
COMMENT ON COLUMN TB_MEAL.MEAL_TYPE IS 'Tipo de refeição';
COMMENT ON COLUMN TB_MEAL.DESCRIPTION IS 'Descrição da refeição';
COMMENT ON COLUMN TB_MEAL.PHOTO_URL IS 'URL da foto da refeição';
COMMENT ON COLUMN TB_MEAL.CREATED_AT IS 'Data de criação do registro';
COMMENT ON COLUMN TB_MEAL.UPDATED_AT IS 'Data de atualização do registro';
COMMENT ON COLUMN TB_MEAL.CREATED_BY IS 'Criado por';
COMMENT ON COLUMN TB_MEAL.UPDATED_BY IS 'Atualizado por';
COMMENT ON COLUMN TB_MEAL.ACTIVE IS 'Status de atividade da refeição';

COMMENT ON COLUMN TB_PATIENT_LOG.ID IS 'Identificador único do registro';
COMMENT ON COLUMN TB_PATIENT_LOG.MEAL_ID IS 'Referência à refeição';
COMMENT ON COLUMN TB_PATIENT_LOG.LOGGED_DATE IS 'Data do registro';
COMMENT ON COLUMN TB_PATIENT_LOG.CONSUMED IS 'Se o paciente consumiu ou não a refeição';
COMMENT ON COLUMN TB_PATIENT_LOG.NOTES IS 'Observações do paciente';
COMMENT ON COLUMN TB_PATIENT_LOG.CREATED_AT IS 'Data de criação do registro';
COMMENT ON COLUMN TB_PATIENT_LOG.UPDATED_AT IS 'Data de atualização do registro';
COMMENT ON COLUMN TB_PATIENT_LOG.CREATED_BY IS 'Criado por';
COMMENT ON COLUMN TB_PATIENT_LOG.UPDATED_BY IS 'Atualizado por';
COMMENT ON COLUMN TB_PATIENT_LOG.ACTIVE IS 'Status de atividade do registro';

COMMENT ON COLUMN TB_SUBSCRIPTION.ID IS 'Identificador único da assinatura';
COMMENT ON COLUMN TB_SUBSCRIPTION.NUTRICIONIST_ID IS 'Referência ao nutricionista';
COMMENT ON COLUMN TB_SUBSCRIPTION.STRIPE_SUBSCRIPTION_ID IS 'Identificador da assinatura no Stripe';
COMMENT ON COLUMN TB_SUBSCRIPTION.PLAN IS 'Tipo de plano da assinatura';
COMMENT ON COLUMN TB_SUBSCRIPTION.STATUS IS 'Status da assinatura';
COMMENT ON COLUMN TB_SUBSCRIPTION.CURRENT_PERIOD_END IS 'Fim do período atual da assinatura';
COMMENT ON COLUMN TB_SUBSCRIPTION.CREATED_AT IS 'Data de criação do registro';
COMMENT ON COLUMN TB_SUBSCRIPTION.UPDATED_AT IS 'Data de atualização do registro';
COMMENT ON COLUMN TB_SUBSCRIPTION.CREATED_BY IS 'Criado por';
COMMENT ON COLUMN TB_SUBSCRIPTION.UPDATED_BY IS 'Atualizado por';
COMMENT ON COLUMN TB_SUBSCRIPTION.ACTIVE IS 'Status de atividade da assinatura';

COMMENT ON COLUMN TB_PLAN_LIMIT.ID IS 'Identificador único do limite de plano';
COMMENT ON COLUMN TB_PLAN_LIMIT.NUTRICIONIST_ID IS 'Referência ao nutricionista';
COMMENT ON COLUMN TB_PLAN_LIMIT.PLAN IS 'Tipo de plano';
COMMENT ON COLUMN TB_PLAN_LIMIT.MAX_PATIENTS IS 'Número máximo de pacientes permitidos';
COMMENT ON COLUMN TB_PLAN_LIMIT.PATIENTS_COUNT IS 'Contagem atual de pacientes';
COMMENT ON COLUMN TB_PLAN_LIMIT.CREATED_AT IS 'Data de criação do registro';
COMMENT ON COLUMN TB_PLAN_LIMIT.UPDATED_AT IS 'Data de atualização do registro';
COMMENT ON COLUMN TB_PLAN_LIMIT.CREATED_BY IS 'Criado por';
COMMENT ON COLUMN TB_PLAN_LIMIT.UPDATED_BY IS 'Atualizado por';
COMMENT ON COLUMN TB_PLAN_LIMIT.ACTIVE IS 'Status de atividade do limite de plano';

COMMENT ON COLUMN TB_STATE.ID IS 'Identificador único do estado';
COMMENT ON COLUMN TB_STATE.NAME IS 'Nome do estado';
COMMENT ON COLUMN TB_STATE.ABBREVIATION IS 'Abreviação do estado';
COMMENT ON COLUMN TB_STATE.LATITUDE IS 'Latitude do estado';
COMMENT ON COLUMN TB_STATE.LONGITUDE IS 'Longitude do estado';
COMMENT ON COLUMN TB_STATE.CREATED_AT IS 'Data de criação do registro';
COMMENT ON COLUMN TB_STATE.UPDATED_AT IS 'Data de atualização do registro';
COMMENT ON COLUMN TB_STATE.CREATED_BY IS 'Criado por';
COMMENT ON COLUMN TB_STATE.UPDATED_BY IS 'Atualizado por';
COMMENT ON COLUMN TB_STATE.ACTIVE IS 'Status de atividade do estado';

COMMENT ON COLUMN TB_TOWNSHIP.ID IS 'Identificador único do município';
COMMENT ON COLUMN TB_TOWNSHIP.NAME IS 'Nome do município';
COMMENT ON COLUMN TB_TOWNSHIP.STATE_ID IS 'Referência ao estado';
COMMENT ON COLUMN TB_TOWNSHIP.LATITUDE IS 'Latitude do município';
COMMENT ON COLUMN TB_TOWNSHIP.LONGITUDE IS 'Longitude do município';
COMMENT ON COLUMN TB_TOWNSHIP.CREATED_AT IS 'Data de criação do registro';
COMMENT ON COLUMN TB_TOWNSHIP.UPDATED_AT IS 'Data de atualização do registro';
COMMENT ON COLUMN TB_TOWNSHIP.CREATED_BY IS 'Criado por';
COMMENT ON COLUMN TB_TOWNSHIP.UPDATED_BY IS 'Atualizado por';
COMMENT ON COLUMN TB_TOWNSHIP.ACTIVE IS 'Status de atividade do município';
-- FIM DOS COMENTÁRIOS