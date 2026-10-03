import React from 'react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  description?: string;
  icon: React.ReactNode;
  iconColor?: string;
  iconBg?: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  subtitle,
  description,
  icon,
  iconColor = 'var(--primary)',
  iconBg = 'var(--primary-light)'
}) => {
  const displaySubtitle = subtitle || description;
  return (
    <div className="card" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
      <div>
        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
          {title}
        </div>
        <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.1 }}>
          {value}
        </div>
        {displaySubtitle && (
          <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', marginTop: '0.4rem' }}>
            {displaySubtitle}
          </div>
        )}
      </div>

      <div style={{
        width: '44px',
        height: '44px',
        borderRadius: 'var(--radius-md)',
        background: iconBg,
        color: iconColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}>
        {icon}
      </div>
    </div>
  );
};
